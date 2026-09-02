import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/product.model';

@Component({
  selector: 'app-create-auction',
  template: `
    <div class="main-content">
      <div class="app-container max-w-3xl">
        <mat-card class="form-card">
          <mat-card-header class="form-header">
            <mat-card-title class="form-title">
              <mat-icon class="text-indigo-400 align-middle">add_circle</mat-icon> Post New Auction Item
            </mat-card-title>
            <mat-card-subtitle class="form-subtitle">
              List your vintage coins, handcrafted furniture, fine art or jewellery for live bidding across Nepal.
            </mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form (ngSubmit)="onSubmit()" #auctionForm="ngForm" class="create-form">
              <!-- Product Name -->
              <mat-form-field appearance="outline">
                <mat-label>Product Name / Title *</mat-label>
                <input matInput placeholder="e.g. 19th Century Malla Dynasty Silver Mohar Coin" [(ngModel)]="productName" name="productName" required />
              </mat-form-field>

              <!-- Category & Image URL -->
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Category *</mat-label>
                  <mat-select [(ngModel)]="category" name="category" required>
                    <mat-option value="Coins">Coins</mat-option>
                    <mat-option value="Furniture">Furniture</mat-option>
                    <mat-option value="Jewellery">Jewellery</mat-option>
                    <mat-option value="Art">Art</mat-option>
                  </mat-select>
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Image URL *</mat-label>
                  <input matInput placeholder="https://images.unsplash.com/..." [(ngModel)]="productImageName" name="productImageName" required />
                </mat-form-field>
              </div>

              <!-- Live Image Preview Box -->
              <div *ngIf="productImageName" class="image-preview-box">
                <span class="preview-label">Image Preview:</span>
                <img [src]="productImageName" alt="Preview" class="preview-img" (error)="onImageError()" />
              </div>

              <!-- Description -->
              <mat-form-field appearance="outline">
                <mat-label>Detailed Description *</mat-label>
                <textarea matInput rows="4" placeholder="Describe provenance, condition, dimensions, material, and historical significance..." [(ngModel)]="description" name="description" required></textarea>
              </mat-form-field>

              <!-- Price Settings -->
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Min Starting Bid (NPR) *</mat-label>
                  <input matInput type="number" placeholder="10000" [(ngModel)]="minPrice" name="minPrice" required />
                </mat-form-field>

                <mat-form-field appearance="outline">
                  <mat-label>Max Reserve Price (NPR)</mat-label>
                  <input matInput type="number" placeholder="50000" [(ngModel)]="maxPrice" name="maxPrice" />
                </mat-form-field>
              </div>

              <!-- Duration Picker -->
              <mat-form-field appearance="outline">
                <mat-label>Auction Duration (Days)</mat-label>
                <mat-select [(ngModel)]="durationDays" name="durationDays">
                  <mat-option [value]="3">3 Days (Fast Auction)</mat-option>
                  <mat-option [value]="5">5 Days</mat-option>
                  <mat-option [value]="7">7 Days (Standard)</mat-option>
                  <mat-option [value]="14">14 Days (Extended)</mat-option>
                </mat-select>
              </mat-form-field>

              <!-- Action Buttons -->
              <div class="form-actions">
                <button type="button" mat-stroked-button (click)="cancel()">Cancel</button>
                <button type="submit" mat-raised-button color="accent" [disabled]="!auctionForm.valid">
                  <mat-icon>cloud_upload</mat-icon> Publish Auction Now
                </button>
              </div>
            </form>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .max-w-3xl { max-width: 768px; margin: 0 auto; }
    .form-card { padding: 28px !important; }
    .form-header { margin-bottom: 24px; padding: 0 !important; }
    .form-title { font-size: 2rem !important; font-weight: 800 !important; margin-bottom: 6px !important; }
    .form-subtitle { color: var(--text-muted) !important; font-size: 0.95rem !important; }
    .create-form { display: flex; flex-direction: column; gap: 8px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .image-preview-box {
      background: rgba(15, 23, 42, 0.6);
      border: 1px dashed rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-md);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }
    .preview-label { font-size: 0.75rem; color: var(--text-muted); }
    .preview-img { width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-sm); }
    .form-actions { display: flex; justify-content: flex-end; gap: 16px; margin-top: 16px; }
    @media (max-width: 640px) {
      .form-row { grid-template-columns: 1fr; }
    }
  `]
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
