import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-catalog',
  template: `
    <div class="main-content">
      <div class="app-container">
        <!-- Header Banner -->
        <mat-card class="catalog-header">
          <mat-card-header class="catalog-title-wrap">
            <mat-card-title class="catalog-title">Live Auction Catalog</mat-card-title>
            <mat-card-subtitle class="catalog-subtitle">Explore rare Nepalese heritage items, coins, thangkas, and antique furniture open for bidding.</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content class="controls-bar">
            <!-- Search -->
            <div class="search-wrap">
              <mat-icon class="search-icon-inside">search</mat-icon>
              <input 
                type="text" 
                class="glass-input search-input-pad" 
                placeholder="Search products by title or category..." 
                [(ngModel)]="searchQuery" 
                (keyup)="applyFilters()"
              />
            </div>

            <!-- Category Filter -->
            <div class="filter-group">
              <label class="filter-label"><mat-icon class="align-middle text-xs">filter_list</mat-icon> Category:</label>
              <select class="glass-input select-input" [(ngModel)]="selectedCategory" (change)="onCategoryChange()">
                <option value="All">All Categories</option>
                <option value="Coins">Coins</option>
                <option value="Furniture">Furniture</option>
                <option value="Jewellery">Jewellery</option>
                <option value="Art">Art</option>
              </select>
            </div>

            <!-- Sort By -->
            <div class="filter-group">
              <label class="filter-label"><mat-icon class="align-middle text-xs">sort</mat-icon> Sort By:</label>
              <select class="glass-input select-input" [(ngModel)]="sortOrder" (change)="applyFilters()">
                <option value="default">Default</option>
                <option value="EndTime">EndTime (Ending Soonest)</option>
                <option value="HighestBid">Highest Bid</option>
                <option value="Price">Price (Min Price)</option>
                <option value="Name">Name (A-Z)</option>
              </select>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Category Quick Pills -->
        <div class="category-pills-bar">
          <mat-chip-listbox aria-label="Category selection">
            <mat-chip-option 
              *ngFor="let cat of ['All', 'Coins', 'Furniture', 'Jewellery', 'Art']"
              [selected]="selectedCategory === cat"
              (click)="setCategory(cat)"
              color="accent"
            >
              {{ cat }}
            </mat-chip-option>
          </mat-chip-listbox>
        </div>

        <!-- Product Grid -->
        <div *ngIf="filteredProducts.length > 0; else noProducts" class="catalog-grid">
          <div *ngFor="let product of filteredProducts" class="catalog-item animate-fade-in">
            <app-product-card [product]="product"></app-product-card>
          </div>
        </div>

        <ng-template #noProducts>
          <mat-card class="empty-state text-center">
            <mat-icon class="text-5xl text-muted mb-4">gavel</mat-icon>
            <h3 class="text-xl font-bold mb-2">No Auctions Found</h3>
            <p class="text-muted mb-6">No items match your query "{{ searchQuery }}" in {{ selectedCategory }}. Try clearing filters.</p>
            <button mat-raised-button color="primary" (click)="resetFilters()">Reset All Filters</button>
          </mat-card>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .catalog-header {
      padding: 28px !important;
      margin-bottom: 24px;
    }
    .catalog-title {
      font-size: 2.25rem !important;
      font-weight: 800 !important;
      margin-bottom: 8px !important;
    }
    .catalog-subtitle {
      color: var(--text-muted) !important;
      font-size: 0.95rem !important;
      margin-bottom: 24px !important;
    }
    .controls-bar {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      align-items: center;
      padding: 0 !important;
    }
    .search-wrap {
      position: relative;
      flex: 1;
      min-width: 240px;
    }
    .search-icon-inside {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-subtle);
    }
    .search-input-pad {
      padding-left: 44px;
    }
    .filter-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .filter-label {
      font-size: 0.85rem;
      color: var(--text-muted);
      white-space: nowrap;
    }
    .select-input {
      width: auto;
      min-width: 170px;
      background: rgba(15, 23, 42, 0.9);
      cursor: pointer;
    }
    .category-pills-bar {
      margin-bottom: 28px;
    }
    .catalog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 28px;
    }
    .empty-state {
      padding: 60px 20px !important;
    }
    @media (max-width: 768px) {
      .controls-bar { flex-direction: column; align-items: stretch; }
    }
  `]
})
export class CatalogComponent implements OnInit {
  filteredProducts: Product[] = [];
  searchQuery: string = '';
  selectedCategory: string = 'All';
  sortOrder: string = 'default';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['q']) {
        this.searchQuery = params['q'];
      }
      this.applyFilters();
    });
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.selectedCategory === 'All' ? null : this.selectedCategory },
      queryParamsHandling: 'merge'
    });
    this.applyFilters();
  }

  onCategoryChange(): void {
    this.setCategory(this.selectedCategory);
  }

  applyFilters(): void {
    this.productService.searchProducts(this.searchQuery, this.selectedCategory, this.sortOrder)
      .subscribe(products => {
        this.filteredProducts = products;
      });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = 'All';
    this.sortOrder = 'default';
    this.applyFilters();
  }
}
