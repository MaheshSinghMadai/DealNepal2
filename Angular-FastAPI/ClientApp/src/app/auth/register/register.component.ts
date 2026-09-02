import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="main-content flex items-center justify-center min-h-screen">
      <div class="app-container max-w-md">
        <mat-card class="auth-card">
          <mat-card-header class="auth-header text-center">
            <div class="logo-icon-lg">
              <mat-icon>person_add</mat-icon>
            </div>
            <mat-card-title class="auth-title">Create DealNepal Account</mat-card-title>
            <mat-card-subtitle class="auth-subtitle">Register to join Nepal's online bidding platform.</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <form (ngSubmit)="onRegister()" class="auth-form">
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>First Name</mat-label>
                  <input matInput placeholder="Srijana" [(ngModel)]="firstName" name="firstName" required />
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>Last Name</mat-label>
                  <input matInput placeholder="Shrestha" [(ngModel)]="lastName" name="lastName" required />
                </mat-form-field>
              </div>

              <mat-form-field appearance="outline">
                <mat-label>Username</mat-label>
                <input matInput placeholder="srijana_shrestha" [(ngModel)]="username" name="username" required />
                <mat-icon matSuffix>account_circle</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Email Address</mat-label>
                <input matInput type="email" placeholder="srijana@gmail.com" [(ngModel)]="email" name="email" required />
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Account Role</mat-label>
                <mat-select [(ngModel)]="role" name="role">
                  <mat-option value="User">Buyer / Collector</mat-option>
                  <mat-option value="Auctioneer">Seller / Auctioneer</mat-option>
                </mat-select>
              </mat-form-field>

              <button mat-raised-button color="primary" type="submit" class="btn-full">
                <mat-icon>check_circle</mat-icon> Register Account
              </button>
            </form>
          </mat-card-content>

          <mat-card-actions class="auth-footer text-center">
            <span class="text-muted text-sm">Already registered? </span>
            <a routerLink="/login" class="text-amber-400 font-bold hover:underline ml-1">Sign In</a>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .max-w-md { max-width: 480px; margin: 0 auto; }
    .auth-card { padding: 28px !important; }
    .logo-icon-lg {
      width: 56px; height: 56px;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-radius: 16px;
      display: flex; align-items: center; justify-content: center;
      color: #ffffff;
      margin: 0 auto 16px auto;
      box-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
    }
    .auth-title { font-size: 1.75rem !important; font-weight: 800 !important; margin-bottom: 6px !important; }
    .auth-subtitle { color: var(--text-muted) !important; font-size: 0.875rem !important; margin-bottom: 24px !important; }
    .auth-form { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .btn-full { width: 100%; height: 48px !important; font-size: 1rem !important; border-radius: var(--radius-md) !important; }
    .auth-footer { display: block; padding-top: 12px !important; }
  `]
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  email: string = '';
  role: 'User' | 'Auctioneer' = 'User';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onRegister(): void {
    if (this.username && this.email) {
      this.authService.register({
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        role: this.role
      }).subscribe(() => {
        this.router.navigate(['/catalog']);
      });
    }
  }
}
