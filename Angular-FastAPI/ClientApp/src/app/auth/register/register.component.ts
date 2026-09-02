import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
