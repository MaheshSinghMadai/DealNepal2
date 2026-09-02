import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Product, Bid } from '../models/product.model';
import { environment } from '../../../environments/environment';

interface ProductOut {
  product_id: number;
  product_name: string;
  product_image_name?: string;
  description?: string;
  category: string;
  min_price: number;
  max_price: number;
  start_time: string;
  end_time: string;
  latest_bid: number;
  user_id: string;
  user_name?: string;
}

interface BidOut {
  bid_id: number;
  product_id: number;
  user_id: string;
  user_name?: string;
  bid_amount: number;
  timestamp: string;
}

interface ProductDetailResponse {
  product: ProductOut;
  recommendations: ProductOut[];
  bid_history: BidOut[];
}

interface BidWithProductDetailsOut {
  bids: BidOut;
  product_name?: string;
  category?: string;
  min_price?: number;
  max_price?: number;
  latest_bid?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshProducts();
  }

  public refreshProducts(): void {
    this.getProducts().subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<ProductOut[]>(`${this.apiUrl}/products`).pipe(
      map(list => list.map(p => this.mapProduct(p))),
      tap(products => this.productsSubject.next(products)),
      catchError(err => {
        console.error('Error fetching products:', err);
        return of([]);
      })
    );
  }

  public getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<ProductOut[]>(`${this.apiUrl}/products`, {
      params: new HttpParams().set('limit', '6')
    }).pipe(
      map(list => list.map(p => this.mapProduct(p))),
      catchError(() => of([]))
    );
  }

  public getProductById(id: number): Observable<Product | undefined> {
    return this.http.get<ProductDetailResponse>(`${this.apiUrl}/products/${id}`).pipe(
      map(res => {
        const prod = this.mapProduct(res.product);
        prod.bids = res.bid_history ? res.bid_history.map(b => this.mapBid(b, prod.productName, prod.productImageName)) : [];
        return prod;
      }),
      catchError(err => {
        console.error('Error fetching product by ID:', err);
        return of(undefined);
      })
    );
  }

  public getProductsByCategory(category: string): Observable<Product[]> {
    if (!category || category === 'All') {
      return this.getProducts();
    }
    return this.http.get<ProductOut[]>(`${this.apiUrl}/categories/${encodeURIComponent(category)}/products`).pipe(
      map(list => list.map(p => this.mapProduct(p))),
      catchError(() => of([]))
    );
  }

  public searchProducts(query: string, category: string = 'All', sortOrder: string = 'default'): Observable<Product[]> {
    let params = new HttpParams();
    if (query && query.trim() !== '') {
      params = params.set('search_string', query.trim());
    }
    if (sortOrder && sortOrder !== 'default') {
      params = params.set('sort_by', sortOrder);
    }

    const endpoint = (query && query.trim() !== '') ? `${this.apiUrl}/products/search` : `${this.apiUrl}/products`;
    
    return this.http.get<ProductOut[]>(endpoint, { params }).pipe(
      map(list => {
        let products = list.map(p => this.mapProduct(p));
        if (category && category !== 'All') {
          products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        return products;
      }),
      catchError(() => of([]))
    );
  }

  public getSimilarProducts(productId: number, category: string): Observable<Product[]> {
    return this.getProductById(productId).pipe(
      map(() => []),
      catchError(() => of([]))
    );
  }

  public placeBid(productID: number, userID: string, userName: string, bidAmount: number): Observable<{ success: boolean; message: string }> {
    const payload = {
      product_id: productID,
      bid_amount: bidAmount
    };

    return this.http.post<BidOut>(`${this.apiUrl}/bids`, payload).pipe(
      map(res => {
        this.refreshProducts();
        return { success: true, message: `Successfully placed bid of NPR ${bidAmount.toLocaleString()}!` };
      }),
      catchError(err => {
        const errorMsg = err?.error?.detail || 'Failed to place bid.';
        return of({ success: false, message: errorMsg });
      })
    );
  }

  public createProduct(productData: Partial<Product>, user: { id: string; name: string }): Observable<Product> {
    const formData = new FormData();
    formData.append('product_name', productData.productName || 'Untitled Auction');
    formData.append('description', productData.description || '');
    formData.append('category', productData.category || 'Coins');
    formData.append('min_price', String(productData.minPrice || 1000));
    formData.append('max_price', String(productData.maxPrice || 10000));
    formData.append('end_time', productData.endTime || new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString());

    return this.http.post<ProductOut>(`${this.apiUrl}/products`, formData).pipe(
      map(res => {
        const created = this.mapProduct(res);
        this.refreshProducts();
        return created;
      })
    );
  }

  public deleteProduct(productId: number): Observable<boolean> {
    return this.http.delete(`${this.apiUrl}/products/${productId}`).pipe(
      map(() => {
        this.refreshProducts();
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public updateProduct(updatedProduct: Product): Observable<boolean> {
    const formData = new FormData();
    formData.append('product_name', updatedProduct.productName);
    formData.append('description', updatedProduct.description);
    formData.append('category', updatedProduct.category);
    formData.append('min_price', String(updatedProduct.minPrice));
    formData.append('max_price', String(updatedProduct.maxPrice));
    formData.append('end_time', updatedProduct.endTime);

    return this.http.put<ProductOut>(`${this.apiUrl}/products/${updatedProduct.productID}`, formData).pipe(
      map(() => {
        this.refreshProducts();
        return true;
      }),
      catchError(() => of(false))
    );
  }

  public getUserAuctions(userId: string): Observable<Product[]> {
    return this.http.get<ProductOut[]>(`${this.apiUrl}/user-data/my-auctions`).pipe(
      map(list => list.map(p => this.mapProduct(p))),
      catchError(() => of([]))
    );
  }

  public getUserBids(userId: string): Observable<{ bid: Bid; product: Product }[]> {
    return this.http.get<BidWithProductDetailsOut[]>(`${this.apiUrl}/user-data/my-bids`).pipe(
      map(list => list.map(item => {
        const p: Product = {
          productID: item.bids.product_id,
          productName: item.product_name || 'Auction Item',
          productImageName: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
          description: '',
          category: item.category || 'Coins',
          minPrice: item.min_price || 0,
          maxPrice: item.max_price || 0,
          startTime: '',
          endTime: '',
          latestBid: item.latest_bid || item.bids.bid_amount,
          userID: '',
          userName: ''
        };
        const b = this.mapBid(item.bids, item.product_name, p.productImageName);
        return { bid: b, product: p };
      })),
      catchError(() => of([]))
    );
  }

  public getUserBidsWon(userName: string): Observable<{ bid: Bid; product: Product }[]> {
    return this.http.get<BidWithProductDetailsOut[]>(`${this.apiUrl}/user-data/bids-won`).pipe(
      map(list => list.map(item => {
        const p: Product = {
          productID: item.bids.product_id,
          productName: item.product_name || 'Auction Item',
          productImageName: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80',
          description: '',
          category: item.category || 'Coins',
          minPrice: item.min_price || 0,
          maxPrice: item.max_price || 0,
          startTime: '',
          endTime: '',
          latestBid: item.latest_bid || item.bids.bid_amount,
          userID: '',
          userName: ''
        };
        const b = this.mapBid(item.bids, item.product_name, p.productImageName);
        return { bid: b, product: p };
      })),
      catchError(() => of([]))
    );
  }

  private mapProduct(p: ProductOut): Product {
    let imageUrl = 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80';
    if (p.product_image_name) {
      if (p.product_image_name.startsWith('http')) {
        imageUrl = p.product_image_name;
      } else {
        imageUrl = `http://localhost:8000/uploads/${p.product_image_name}`;
      }
    }

    return {
      productID: p.product_id,
      productName: p.product_name,
      productImageName: imageUrl,
      description: p.description || '',
      category: p.category,
      minPrice: p.min_price,
      maxPrice: p.max_price,
      startTime: p.start_time,
      endTime: p.end_time,
      latestBid: p.latest_bid,
      userID: p.user_id,
      userName: p.user_name || 'Seller',
      isFeatured: p.latest_bid > 15000
    };
  }

  private mapBid(b: BidOut, productName?: string, productImageName?: string): Bid {
    return {
      bidID: b.bid_id,
      productID: b.product_id,
      userID: b.user_id,
      userName: b.user_name || 'Bidder',
      bidAmount: b.bid_amount,
      timestamp: b.timestamp,
      productName: productName,
      productImageName: productImageName
    };
  }
}
