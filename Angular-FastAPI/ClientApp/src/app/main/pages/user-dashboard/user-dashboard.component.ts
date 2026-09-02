import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, Bid, User } from '../../../core/models/product.model';

@Component({
  selector: 'app-user-dashboard',
  template: `
    <div class="main-content">
      <div class="app-container">
        <!-- Dashboard Profile Banner -->
        <mat-card class="profile-banner-card" *ngIf="currentUser">
          <mat-card-content class="banner-content">
            <img [src]="currentUser.profilePictureUrl" alt="Avatar" class="banner-avatar" />
            <div class="banner-info">
              <h1 class="user-fullname">{{ currentUser.firstName }} {{ currentUser.lastName }}</h1>
              <div class="user-meta-row">
                <span class="user-handle">&#64;{{ currentUser.username }}</span>
                <span class="badge-category">{{ currentUser.email }}</span>
                <span class="badge-live" [class.role-admin]="currentUser.role === 'Admin'">{{ currentUser.role }} ACCOUNT</span>
              </div>
            </div>

            <div class="banner-actions">
              <a *ngIf="currentUser.role === 'Auctioneer' || currentUser.role === 'Admin'" routerLink="/create" mat-raised-button color="accent">
                <mat-icon>add</mat-icon> Post Auction
              </a>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Material UI Tabs -->
        <mat-tab-group class="dashboard-mat-tabs" animationDuration="200ms">
          <!-- TAB 1: MY BIDS -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">gavel</mat-icon> My Bids ({{ myBids.length }})
            </ng-template>
            
            <div class="tab-content py-6 animate-fade-in">
              <mat-card *ngIf="myBids.length > 0; else noMyBids" class="table-card">
                <mat-card-content class="p-0">
                  <table class="dashboard-table">
                    <thead>
                      <tr>
                        <th>Auction Item</th>
                        <th>Category</th>
                        <th>My Bid Amount</th>
                        <th>Current Highest</th>
                        <th>Bid Timestamp</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of myBids">
                        <td class="item-cell">
                          <img [src]="item.product.productImageName" [alt]="item.product.productName" class="thumb-img" />
                          <span class="item-name">{{ item.product.productName }}</span>
                        </td>
                        <td><span class="badge-category">{{ item.product.category }}</span></td>
                        <td class="amount-cell">NPR {{ item.bid.bidAmount | number }}</td>
                        <td class="amount-cell text-amber-400">NPR {{ item.product.latestBid | number }}</td>
                        <td class="time-cell">{{ item.bid.timestamp | date:'short' }}</td>
                        <td>
                          <span *ngIf="item.bid.bidAmount === item.product.latestBid" class="badge-live">HIGHEST BIDDER</span>
                          <span *ngIf="item.bid.bidAmount < item.product.latestBid" class="badge-gold text-rose-400">OUTBID</span>
                        </td>
                        <td>
                          <a [routerLink]="['/product', item.product.productID]" mat-stroked-button color="primary">View Item</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </mat-card-content>
              </mat-card>

              <ng-template #noMyBids>
                <mat-card class="empty-box text-center">
                  <mat-icon class="text-5xl text-muted mb-3">gavel</mat-icon>
                  <h3 class="font-bold text-lg">No Active Bids Placed</h3>
                  <p class="text-muted text-sm mb-4">You haven't placed any bids yet. Check our live catalog!</p>
                  <a routerLink="/catalog" mat-raised-button color="primary">Browse Catalog</a>
                </mat-card>
              </ng-template>
            </div>
          </mat-tab>

          <!-- TAB 2: MY LISTED AUCTIONS -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">inventory_2</mat-icon> My Listed Auctions ({{ myAuctions.length }})
            </ng-template>
            
            <div class="tab-content py-6 animate-fade-in">
              <mat-card *ngIf="myAuctions.length > 0; else noMyAuctions" class="table-card">
                <mat-card-content class="p-0">
                  <table class="dashboard-table">
                    <thead>
                      <tr>
                        <th>Item Title</th>
                        <th>Category</th>
                        <th>Starting Price</th>
                        <th>Current Highest</th>
                        <th>Total Bids</th>
                        <th>End Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let prod of myAuctions">
                        <td class="item-cell">
                          <img [src]="prod.productImageName" [alt]="prod.productName" class="thumb-img" />
                          <span class="item-name">{{ prod.productName }}</span>
                        </td>
                        <td><span class="badge-category">{{ prod.category }}</span></td>
                        <td>NPR {{ prod.minPrice | number }}</td>
                        <td class="amount-cell text-amber-400">NPR {{ prod.latestBid | number }}</td>
                        <td><span class="badge-gold">{{ prod.bids?.length || 0 }} Bids</span></td>
                        <td class="time-cell">{{ prod.endTime | date:'mediumDate' }}</td>
                        <td>
                          <div class="action-btns">
                            <a [routerLink]="['/product', prod.productID]" mat-icon-button color="primary"><mat-icon>visibility</mat-icon></a>
                            <button (click)="deleteAuction(prod.productID)" mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </mat-card-content>
              </mat-card>

              <ng-template #noMyAuctions>
                <mat-card class="empty-box text-center">
                  <mat-icon class="text-5xl text-muted mb-3">storefront</mat-icon>
                  <h3 class="font-bold text-lg">No Auctions Posted</h3>
                  <p class="text-muted text-sm mb-4">Sell your rare antiques, coins, and art on DealNepal.</p>
                  <a routerLink="/create" mat-raised-button color="accent">Post First Auction</a>
                </mat-card>
              </ng-template>
            </div>
          </mat-tab>

          <!-- TAB 3: WON DEALS -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2 text-amber-400">emoji_events</mat-icon> Won Deals ({{ wonBids.length }})
            </ng-template>

            <div class="tab-content py-6 animate-fade-in">
              <mat-card *ngIf="wonBids.length > 0; else noWon" class="table-card">
                <mat-card-content class="p-0">
                  <table class="dashboard-table">
                    <thead>
                      <tr>
                        <th>Won Item</th>
                        <th>Winning Bid Amount</th>
                        <th>Seller</th>
                        <th>Escrow Status</th>
                        <th>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let item of wonBids">
                        <td class="item-cell">
                          <img [src]="item.product.productImageName" [alt]="item.product.productName" class="thumb-img" />
                          <span class="item-name">{{ item.product.productName }}</span>
                        </td>
                        <td class="amount-cell text-emerald-400">NPR {{ item.bid.bidAmount | number }}</td>
                        <td>&#64;{{ item.product.userName }}</td>
                        <td><span class="badge-live">VERIFIED ESCROW</span></td>
                        <td>
                          <a [routerLink]="['/product', item.product.productID]" mat-raised-button color="primary">Claim Deal</a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </mat-card-content>
              </mat-card>

              <ng-template #noWon>
                <mat-card class="empty-box text-center">
                  <mat-icon class="text-5xl text-muted mb-3">emoji_events</mat-icon>
                  <h3 class="font-bold text-lg">No Won Deals Yet</h3>
                  <p class="text-muted text-sm">When an auction closes and your bid is highest, it will appear here!</p>
                </mat-card>
              </ng-template>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .profile-banner-card {
      margin-bottom: 32px;
      padding: 12px;
    }
    .banner-content {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .banner-avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--accent-primary);
    }
    .banner-info { flex: 1; }
    .user-fullname { font-size: 1.75rem; font-weight: 800; margin-bottom: 6px; }
    .user-meta-row { display: flex; align-items: center; gap: 12px; }
    .user-handle { font-size: 0.9rem; color: var(--accent-gold); font-weight: 600; }
    
    .table-card { overflow-x: auto; }
    .dashboard-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .dashboard-table th { text-align: left; padding: 14px 16px; color: var(--text-subtle); text-transform: uppercase; font-size: 0.78rem; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .dashboard-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .item-cell { display: flex; align-items: center; gap: 12px; }
    .thumb-img { width: 44px; height: 44px; border-radius: var(--radius-sm); object-fit: cover; }
    .item-name { font-weight: 600; color: #ffffff; max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .amount-cell { font-family: var(--font-heading); font-weight: 700; }
    .action-btns { display: flex; gap: 8px; }
    .empty-box { padding: 48px !important; }
  `]
})
export class UserDashboardComponent implements OnInit {
  currentUser: User | null = null;
  myBids: { bid: Bid; product: Product }[] = [];
  myAuctions: Product[] = [];
  wonBids: { bid: Bid; product: Product }[] = [];

  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadUserData(user);
      }
    });
  }

  loadUserData(user: User): void {
    this.productService.getUserBids(user.id).subscribe(bids => {
      this.myBids = bids;
    });

    this.productService.getUserAuctions(user.id).subscribe(auctions => {
      this.myAuctions = auctions;
    });

    this.productService.getUserBidsWon(user.username).subscribe(won => {
      this.wonBids = won;
    });
  }

  deleteAuction(productId: number): void {
    if (confirm('Are you sure you want to delete this auction listing?')) {
      this.productService.deleteProduct(productId).subscribe(() => {
        if (this.currentUser) this.loadUserData(this.currentUser);
      });
    }
  }
}
