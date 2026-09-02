import { Component, Input } from '@angular/core';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  template: `
    <mat-card class="product-mat-card" *ngIf="product">
      <!-- Image Header with Badges -->
      <div class="card-image-wrap">
        <img mat-card-image [src]="product.productImageName" [alt]="product.productName" class="card-img" />
        
        <div class="card-badge-overlay">
          <mat-chip-option color="primary" selected class="category-chip">
            {{ product.category }}
          </mat-chip-option>
          <span class="badge-live">LIVE</span>
        </div>

        <div class="timer-overlay">
          <app-countdown-timer [endTime]="product.endTime"></app-countdown-timer>
        </div>
      </div>

      <!-- Card Body Content -->
      <mat-card-content class="card-body">
        <h3 class="card-title">
          <a [routerLink]="['/product', product.productID]">{{ product.productName }}</a>
        </h3>
        
        <p class="card-desc">{{ product.description | slice:0:70 }}...</p>

        <div class="bid-pricing-row">
          <div class="price-col">
            <span class="price-label">Current Highest Bid</span>
            <span class="price-amount">NPR {{ product.latestBid | number }}</span>
          </div>

          <div class="price-col text-right">
            <span class="price-label">Est. Price Range</span>
            <span class="start-price">NPR {{ product.minPrice | number }} - {{ product.maxPrice | number }}</span>
          </div>
        </div>
      </mat-card-content>

      <!-- Card Footer Actions -->
      <mat-card-actions class="card-footer-row">
        <div class="seller-meta">
          <mat-icon class="text-xs text-muted">person</mat-icon>
          <span class="seller-name">{{ product.userName }}</span>
        </div>

        <a [routerLink]="['/product', product.productID]" mat-raised-button color="accent" class="bid-mat-btn">
          <mat-icon>gavel</mat-icon> Place Bid
        </a>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [`
    .product-mat-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      transition: var(--transition);
      background: #ffffff !important;
      border: 1px solid #e2e8f0 !important;
      border-radius: var(--radius-lg) !important;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05) !important;
    }
    .product-mat-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12) !important;
      border-color: rgba(79, 70, 229, 0.3) !important;
    }
    .card-image-wrap {
      position: relative;
      width: 100%;
      height: 230px;
      overflow: hidden;
      background: #f1f5f9;
    }
    .card-img {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    .product-mat-card:hover .card-img {
      transform: scale(1.05);
    }
    .card-badge-overlay {
      position: absolute;
      top: 12px;
      left: 12px;
      display: flex;
      gap: 8px;
      align-items: center;
      z-index: 2;
    }
    .category-chip {
      font-size: 0.75rem !important;
      height: 26px !important;
      min-height: 26px !important;
    }
    .timer-overlay {
      position: absolute;
      bottom: 12px;
      right: 12px;
      z-index: 2;
    }
    .card-body {
      padding: 18px 20px 10px 20px !important;
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .card-title {
      font-size: 1.1rem;
      font-weight: 700;
      line-height: 1.35;
      margin-bottom: 8px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .card-title a {
      color: #0f172a;
      transition: var(--transition);
    }
    .card-title a:hover {
      color: var(--accent-primary);
    }
    .card-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin-bottom: 16px;
      line-height: 1.5;
    }
    .bid-pricing-row {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: var(--radius-sm);
      padding: 10px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
    }
    .price-col {
      display: flex;
      flex-direction: column;
    }
    .price-label {
      font-size: 0.7rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }
    .price-amount {
      font-family: var(--font-heading);
      font-weight: 800;
      font-size: 1.1rem;
      color: var(--accent-gold);
    }
    .start-price {
      font-size: 0.8rem;
      color: var(--text-muted);
      font-weight: 600;
    }
    .card-footer-row {
      padding: 12px 20px 16px 20px !important;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .seller-meta {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .seller-name {
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    .bid-mat-btn {
      border-radius: 9999px !important;
      font-family: var(--font-heading) !important;
      font-weight: 600 !important;
    }
    .text-right { text-align: right; }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;
}
