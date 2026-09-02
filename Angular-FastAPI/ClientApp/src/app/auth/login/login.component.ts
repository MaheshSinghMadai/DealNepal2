import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="main-content flex items-center justify-center min-h-screen">
      <div class="app-container max-w-md">
        <mat-card class="auth-card">
          <mat-card-header class="auth-header text-center">
            <div class="logo-icon-lg">
              <mat-icon>gavel</mat-icon>
            </div>
            <mat-card-title class="auth-title">Sign In to DealNepal</mat-card-title>
            <mat-card-subtitle class="auth-subtitle">Enter your credentials to manage auctions and place live bids.</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form (ngSubmit)="onLogin()" class="auth-form">
              <mat-form-field appearance="outline">
                <mat-label>Username / Email</mat-label>
                <input matInput placeholder="mahesh_admin" [(ngModel)]="username" name="username" required />
                <mat-icon matSuffix>person</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Password</mat-label>
                <input matInput type="password" placeholder="••••••••" [(ngModel)]="password" name="password" required />
                <mat-icon matSuffix>lock</mat-icon>
              </mat-form-field>

              <!-- Role Selector Demo -->
              <div class="demo-select-box">
                <span class="text-xs text-muted block mb-2 font-medium">Select Account Role Demo:</span>
                <div class="role-selector-btns">
                  <button type="button" [class.selected]="selectedRole === 'Admin'" (click)="selectedRole = 'Admin'">Admin</button>
                  <button type="button" [class.selected]="selectedRole === 'Auctioneer'" (click)="selectedRole = 'Auctioneer'">Seller</button>
                  <button type="button" [class.selected]="selectedRole === 'User'" (click)="selectedRole = 'User'">Buyer</button>
                </div>
              </div>

              <button mat-raised-button color="accent" type="submit" class="btn-full">
                <mat-icon>login</mat-icon> Log In
              </button>
            </form>
          </mat-card-content>

          <mat-card-actions class="auth-footer text-center">
            <span class="text-muted text-sm">Don't have an account? </span>
            <a routerLink="/register" class="text-amber-400 font-bold hover:underline ml-1">Register Here</a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .max-w-md { max-width: 440px; margin: 0 auto; }
    .auth-card { padding: 28px !important; }
    .logo-icon-lg {
      width: 56px; height: 56px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      color: #ffffff;
      margin: 0 auto 16px auto;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
    }
    .auth-title { font-size: 1.75rem !important; font-weight: 800 !important; margin-bottom: 6px !important; }
    .auth-subtitle { color: var(--text-muted) !important; font-size: 0.875rem !important; margin-bottom: 24px !important; }
    .auth-form { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
    .demo-select-box { background: rgba(15, 23, 42, 0.6); padding: 12px; border-radius: var(--radius-md); border: 1px solid rgba(255, 255, 255, 0.08); margin-bottom: 12px; }
    .role-selector-btns { display: flex; gap: 8px; }
    .role-selector-btns button {
      flex: 1; background: transparent; border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--text-muted); font-size: 0.8rem; font-weight: 600; padding: 6px; border-radius: var(--radius-sm);
      cursor: pointer; transition: var(--transition);
    }
    .role-selector-btns button.selected {
      background: var(--accent-primary); color: #ffffff; border-color: var(--accent-primary);
    }
    .btn-full { width: 100%; height: 48px !important; font-size: 1rem !important; border-radius: var(--radius-md) !important; }
    .auth-footer { display: block; padding-top: 12px !important; }
  `]
})
export class LoginComponent {
  username: string = 'mahesh_admin';
  password: string = 'password123';
  selectedRole: 'Admin' | 'Auctioneer' | 'User' = 'Admin';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    if (this.username) {
      this.authService.login(this.username, this.selectedRole).subscribe(() => {
        if (this.selectedRole === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/catalog']);
        }
      });
    }
  }
}
