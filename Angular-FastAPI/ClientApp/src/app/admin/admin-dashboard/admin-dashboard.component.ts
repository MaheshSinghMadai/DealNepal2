import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../core/services/admin.service';
import { ProductService } from '../../core/services/product.service';
import { AuthService } from '../../core/services/auth.service';
import { DashboardStats, UserActivity, Product, User } from '../../core/models/product.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
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
