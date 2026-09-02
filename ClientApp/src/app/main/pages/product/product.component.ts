import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, Bid, User } from '../../../core/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product | undefined;
  similarProducts: Product[] = [];
  currentUser: User | null = null;
  bidInputAmount: number = 0;
  bidMessage: string = '';
  bidSuccess: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.loadProductDetails(id);
      }
    });
  }

  loadProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe(prod => {
      this.product = prod;
      if (prod) {
        this.bidInputAmount = prod.latestBid + 1000;
        this.productService.getSimilarProducts(prod.productID, prod.category).subscribe(similar => {
          this.similarProducts = similar;
        });
      }
    });
  }

  quickIncrement(amount: number): void {
    if (this.product) {
      this.bidInputAmount = (this.bidInputAmount || this.product.latestBid) + amount;
    }
  }

  submitBid(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    if (!this.product) return;

    this.productService.placeBid(
      this.product.productID,
      this.currentUser.id,
      this.currentUser.username,
      this.bidInputAmount
    ).subscribe(res => {
      this.bidMessage = res.message;
      this.bidSuccess = res.success;
      if (res.success) {
        this.loadProductDetails(this.product!.productID);
      }
    });
  }
}
