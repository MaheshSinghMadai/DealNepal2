import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardStats, UserActivity, Product, User } from '../../core/models/product.model';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="main-content">
      <div class="app-container">
        <!-- Admin Header -->
        <mat-card class="admin-header-card">
          <mat-card-content>
            <div class="badge-live mb-2"><mat-icon class="align-middle text-xs">admin_panel_settings</mat-icon> SYSTEM ADMIN CONSOLE</div>
            <h1 class="admin-title">DealNepal Admin Dashboard</h1>
            <p class="admin-subtitle">Monitor entity metrics, category bidding activity, manage products, audit user activity logs, and configure user role permissions.</p>
          </mat-card-content>
        </mat-card>

        <!-- KPI Metric Cards Grid -->
        <div class="kpi-grid" *ngIf="stats">
          <mat-card class="kpi-card">
            <div class="kpi-icon icon-indigo"><mat-icon>gavel</mat-icon></div>
            <div class="kpi-meta">
              <span class="kpi-label">Products Count</span>
              <span class="kpi-value">{{ stats.products_count }}</span>
            </div>
          </mat-card>

          <mat-card class="kpi-card">
            <div class="kpi-icon icon-amber"><mat-icon>payments</mat-icon></div>
            <div class="kpi-meta">
              <span class="kpi-label">Bids Count</span>
              <span class="kpi-value">{{ stats.bids_count }}</span>
            </div>
          </mat-card>

          <mat-card class="kpi-card">
            <div class="kpi-icon icon-emerald"><mat-icon>people</mat-icon></div>
            <div class="kpi-meta">
              <span class="kpi-label">Users Count</span>
              <span class="kpi-value">{{ stats.users_count }}</span>
            </div>
          </mat-card>

          <mat-card class="kpi-card">
            <div class="kpi-icon icon-rose"><mat-icon>history_edu</mat-icon></div>
            <div class="kpi-meta">
              <span class="kpi-label">User Activity Count</span>
              <span class="kpi-value">{{ stats.userActivity_count }}</span>
            </div>
          </mat-card>
        </div>

        <!-- Analytics Visual Charts Row (CanvasJS Upgrade with Material UI) -->
        <div class="charts-row" *ngIf="stats">
          <!-- Categorical Distribution Breakdown -->
          <mat-card class="chart-card">
            <mat-card-header>
              <mat-card-title class="chart-title">
                <mat-icon class="text-amber-400">pie_chart</mat-icon> Categorical Product & Bid Breakdown
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="cat-bar-list">
                <div class="cat-bar-item">
                  <div class="cat-bar-header">
                    <span>Coins</span>
                    <span class="font-bold">{{ stats.coins_count }} Products | {{ stats.coins_BidCount }} Bids</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="75" color="accent"></mat-progress-bar>
                </div>

                <div class="cat-bar-item">
                  <div class="cat-bar-header">
                    <span>Furniture</span>
                    <span class="font-bold">{{ stats.furniture_count }} Products | {{ stats.furniture_BidCount }} Bids</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="60" color="primary"></mat-progress-bar>
                </div>

                <div class="cat-bar-item">
                  <div class="cat-bar-header">
                    <span>Jewellery</span>
                    <span class="font-bold">{{ stats.jewellery_count }} Products | {{ stats.jewellery_BidCount }} Bids</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="50" color="warn"></mat-progress-bar>
                </div>

                <div class="cat-bar-item">
                  <div class="cat-bar-header">
                    <span>Art</span>
                    <span class="font-bold">{{ stats.art_count }} Products | {{ stats.art_BidCount }} Bids</span>
                  </div>
                  <mat-progress-bar mode="determinate" value="85" color="accent"></mat-progress-bar>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <!-- Monthly Bidding Activity Growth -->
          <mat-card class="chart-card">
            <mat-card-header>
              <mat-card-title class="chart-title">
                <mat-icon class="text-indigo-400">bar_chart</mat-icon> Monthly Activity Distribution
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="monthly-bars">
                <div *ngFor="let m of stats.monthlyActivities" class="monthly-col">
                  <span class="month-count">{{ m.count }}</span>
                  <div class="month-bar" [style.height.px]="m.count * 2.2"></div>
                  <span class="month-name">{{ m.month }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Admin Management Material Tabs -->
        <mat-tab-group class="admin-mat-tabs" animationDuration="200ms">
          <!-- TAB 1: PRODUCTS MANAGEMENT TABLE -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">view_list</mat-icon> Product Details ({{ allProducts.length }})
            </ng-template>

            <div class="tab-content py-6 animate-fade-in">
              <mat-card class="admin-table-card">
                <div class="table-toolbar">
                  <h3 class="box-title">Manage Products List</h3>
                  <input type="text" class="glass-input search-sm" placeholder="Filter products..." [(ngModel)]="prodSearch" />
                </div>

                <div class="table-responsive">
                  <table class="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Min Price</th>
                        <th>Latest Bid</th>
                        <th>Seller</th>
                        <th>End Time</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let p of filteredProducts">
                        <td class="font-mono text-xs">#{{ p.productID }}</td>
                        <td class="item-cell">
                          <img [src]="p.productImageName" [alt]="p.productName" class="thumb-img" />
                          <span class="item-name">{{ p.productName }}</span>
                        </td>
                        <td><span class="badge-category">{{ p.category }}</span></td>
                        <td>NPR {{ p.minPrice | number }}</td>
                        <td class="amount-cell text-amber-400">NPR {{ p.latestBid | number }}</td>
                        <td>&#64;{{ p.userName }}</td>
                        <td class="time-cell">{{ p.endTime | date:'mediumDate' }}</td>
                        <td>
                          <div class="action-btns">
                            <a [routerLink]="['/product', p.productID]" mat-icon-button color="primary"><mat-icon>visibility</mat-icon></a>
                            <button (click)="deleteProduct(p.productID)" mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </mat-card>
            </div>
          </mat-tab>

          <!-- TAB 2: USER ROLES MANAGEMENT -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">manage_accounts</mat-icon> Manage User Roles ({{ allUsers.length }})
            </ng-template>

            <div class="tab-content py-6 animate-fade-in">
              <mat-card class="admin-table-card">
                <div class="table-toolbar">
                  <h3 class="box-title">User Roles Console</h3>
                </div>

                <div class="table-responsive">
                  <table class="admin-table">
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>User Details</th>
                        <th>Email</th>
                        <th>Current Role</th>
                        <th>Manage Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let u of allUsers">
                        <td class="font-mono text-xs">{{ u.id }}</td>
                        <td class="item-cell">
                          <img [src]="u.profilePictureUrl" [alt]="u.username" class="thumb-avatar" />
                          <div>
                            <div class="font-bold text-white">{{ u.firstName }} {{ u.lastName }}</div>
                            <div class="text-xs text-muted">&#64;{{ u.username }}</div>
                          </div>
                        </td>
                        <td>{{ u.email }}</td>
                        <td>
                          <span class="badge-live" [class.role-admin]="u.role === 'Admin'">
                            {{ u.role }}
                          </span>
                        </td>
                        <td>
                          <div class="role-btn-toggles">
                            <button (click)="changeUserRole(u, 'Admin')" [class.active-r]="u.role === 'Admin'">Admin</button>
                            <button (click)="changeUserRole(u, 'Auctioneer')" [class.active-r]="u.role === 'Auctioneer'">Auctioneer</button>
                            <button (click)="changeUserRole(u, 'User')" [class.active-r]="u.role === 'User'">Buyer</button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </mat-card>
            </div>
          </mat-tab>

          <!-- TAB 3: USER ACTIVITY DETAILS -->
          <mat-tab>
            <ng-template mat-tab-label>
              <mat-icon class="mr-2">read_more</mat-icon> User Activity Details ({{ activities.length }})
            </ng-template>

            <div class="tab-content py-6 animate-fade-in">
              <mat-card class="admin-table-card">
                <div class="table-toolbar">
                  <h3 class="box-title">System Audit Log</h3>
                </div>

                <div class="table-responsive">
                  <table class="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Action</th>
                        <th>Event Summary</th>
                        <th>Activity Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr *ngFor="let act of activities">
                        <td class="font-mono text-xs">#{{ act.id }}</td>
                        <td class="font-bold text-white">&#64;{{ act.userName }}</td>
                        <td><span class="badge-gold">{{ act.action }}</span></td>
                        <td>{{ act.data }}</td>
                        <td class="time-cell">{{ act.activityDate | date:'medium' }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </mat-card>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .admin-header-card { padding: 12px; margin-bottom: 28px; }
    .admin-title { font-size: 2.25rem; font-weight: 800; margin-bottom: 6px; }
    .admin-subtitle { color: var(--text-muted); font-size: 0.95rem; }

    .kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; margin-bottom: 32px; }
    .kpi-card { padding: 20px; display: flex; flex-direction: row; align-items: center; gap: 20px; }
    .kpi-icon { width: 54px; height: 54px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .icon-indigo { background: rgba(99, 102, 241, 0.15); color: #a5b4fc; }
    .icon-amber { background: rgba(245, 158, 11, 0.15); color: #fcd34d; }
    .icon-emerald { background: rgba(16, 185, 129, 0.15); color: #6ee7b7; }
    .icon-rose { background: rgba(244, 63, 94, 0.15); color: #fda4af; }
    .kpi-meta { display: flex; flex-direction: column; }
    .kpi-label { font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
    .kpi-value { font-family: var(--font-heading); font-size: 2rem; font-weight: 800; color: #ffffff; }

    .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 36px; }
    .chart-card { padding: 20px !important; }
    .chart-title { font-size: 1.15rem !important; font-weight: 700 !important; margin-bottom: 20px !important; display: flex; align-items: center; gap: 10px; }
    .cat-bar-list { display: flex; flex-direction: column; gap: 18px; }
    .cat-bar-item { display: flex; flex-direction: column; gap: 8px; }
    .cat-bar-header { display: flex; justify-content: space-between; font-size: 0.875rem; color: var(--text-muted); }

    .monthly-bars { display: flex; align-items: flex-end; justify-content: space-between; height: 180px; padding-top: 20px; }
    .monthly-col { display: flex; flex-direction: column; align-items: center; gap: 8px; flex: 1; }
    .month-count { font-size: 0.75rem; font-weight: 700; color: var(--accent-gold); }
    .month-bar { width: 32px; background: linear-gradient(180deg, var(--accent-primary) 0%, var(--accent-secondary) 100%); border-radius: 6px 6px 0 0; }
    .month-name { font-size: 0.8rem; color: var(--text-muted); }

    .admin-table-card { padding: 24px !important; }
    .table-toolbar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .search-sm { width: 220px; height: 38px; font-size: 0.85rem; }
    .table-responsive { overflow-x: auto; }
    .admin-table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
    .admin-table th { text-align: left; padding: 12px; color: var(--text-subtle); font-size: 0.78rem; text-transform: uppercase; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
    .admin-table td { padding: 14px 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .thumb-avatar { width: 38px; height: 38px; border-radius: 50%; object-fit: cover; }
    .role-btn-toggles { display: flex; gap: 6px; }
    .role-btn-toggles button { background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); color: var(--text-muted); font-size: 0.75rem; padding: 4px 10px; border-radius: 4px; cursor: pointer; transition: var(--transition); }
    .role-btn-toggles button.active-r { background: var(--accent-primary); color: #ffffff; border-color: var(--accent-primary); }

    @media (max-width: 992px) {
      .charts-row { grid-template-columns: 1fr; }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats | undefined;
  activities: UserActivity[] = [];
  allProducts: Product[] = [];
  allUsers: User[] = [];
  prodSearch: string = '';

  constructor(
    private adminService: AdminService,
    private productService: ProductService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe(s => this.stats = s);
    this.adminService.getUserActivities().subscribe(a => this.activities = a);
    this.productService.getProducts().subscribe(p => this.allProducts = p);
    this.authService.getAllUsers().subscribe(u => this.allUsers = u);
  }

  get filteredProducts(): Product[] {
    if (!this.prodSearch.trim()) return this.allProducts;
    return this.allProducts.filter(p => p.productName.toLowerCase().includes(this.prodSearch.toLowerCase()));
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this auction listing?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.productService.getProducts().subscribe(p => this.allProducts = p);
      });
    }
  }

  changeUserRole(user: User, newRole: 'Admin' | 'Auctioneer' | 'User'): void {
    user.role = newRole;
    this.adminService.logActivity('admin', 'mahesh_admin', 'Role Updated', `Changed role of ${user.username} to ${newRole}`);
  }
}
