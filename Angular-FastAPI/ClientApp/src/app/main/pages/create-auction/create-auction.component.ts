import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/product.model';

@Component({
  selector: 'app-create-auction',
  templateUrl: './create-auction.component.html',
  styleUrls: ['./create-auction.component.css']
})
export class CreateAuctionComponent implements OnInit {
  productName: string = '';
  category: string = 'Coins';
  productImageName: string = 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80';
  description: string = '';
  minPrice: number = 10000;
  maxPrice: number = 35000;
  durationDays: number = 7;
  currentUser: User | null = null;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onImageError(): void {
    this.productImageName = 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80';
  }

  onSubmit(): void {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    const endTimeDate = new Date(Date.now() + this.durationDays * 24 * 3600 * 1000).toISOString();

    this.productService.createProduct({
      productName: this.productName,
      category: this.category,
      productImageName: this.productImageName,
      description: this.description,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      endTime: endTimeDate
    }, {
      id: this.currentUser.id,
      name: this.currentUser.username
    }).subscribe(created => {
      this.router.navigate(['/product', created.productID]);
    });
  }

  cancel(): void {
    this.router.navigate(['/catalog']);
  }
}
