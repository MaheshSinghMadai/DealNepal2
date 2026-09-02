import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
