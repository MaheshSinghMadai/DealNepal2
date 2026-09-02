import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { AuthService } from '../../../core/services/auth.service';
import { Product, Bid, User } from '../../../core/models/product.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
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
