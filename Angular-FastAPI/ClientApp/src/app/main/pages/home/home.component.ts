import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  searchQuery: string = '';
  currentSlideIdx: number = 0;
  private autoSlideTimer: any;

  slides = [
    {
      title: 'Art',
      category: 'Art',
      desc: 'Sacred Gold-Leaf Thangka paintings and traditional Newari scroll art.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Coins',
      category: 'Coins',
      desc: 'Rare historical silver Mohar coins from Shah & Malla dynasty eras.',
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Jewelleries',
      category: 'Jewellery',
      desc: '22K Gold Plated traditional Nepalese Tilhari & bridal ornaments.',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Furniture',
      category: 'Furniture',
      desc: 'Hand-carved Newari Mayur Jhyal Peacock Windows & Teakwood tables.',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });

    this.autoSlideTimer = setInterval(() => this.nextSlide(), 5000);
  }

  ngOnDestroy(): void {
    if (this.autoSlideTimer) {
      clearInterval(this.autoSlideTimer);
    }
  }

  get activeSlide() {
    return this.slides[this.currentSlideIdx];
  }

  nextSlide(): void {
    this.currentSlideIdx = (this.currentSlideIdx + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlideIdx = (this.currentSlideIdx - 1 + this.slides.length) % this.slides.length;
  }

  onHeroSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/catalog'], { queryParams: { q: this.searchQuery.trim() } });
    } else {
      this.router.navigate(['/catalog']);
    }
  }
}
