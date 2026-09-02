import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer-wrapper">
      <div class="app-container">
        <div class="footer-top">
          <div class="footer-col brand-col">
            <div class="footer-logo">
              <i class="fa-solid fa-gavel text-indigo-600"></i>
              <span class="font-bold text-xl text-slate-900">Deal<span class="text-amber-600">Nepal</span></span>
            </div>
            <p class="footer-desc">
              Nepal's premier online auction platform for authentic rare coins, handcrafted furniture, heritage jewellery, and sacred Nepalese fine art.
            </p>
            <div class="social-links">
              <a href="#" aria-label="Facebook"><i class="fa-brands fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i class="fa-brands fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">Categories</h4>
            <ul class="footer-links">
              <li><a [routerLink]="['/catalog']" [queryParams]="{category: 'Coins'}">Rare Coins & Mohars</a></li>
              <li><a [routerLink]="['/catalog']" [queryParams]="{category: 'Furniture'}">Antique Newari Furniture</a></li>
              <li><a [routerLink]="['/catalog']" [queryParams]="{category: 'Jewellery'}">Heritage Gold Jewellery</a></li>
              <li><a [routerLink]="['/catalog']" [queryParams]="{category: 'Art'}">Fine Art & Thangkas</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">Quick Access</h4>
            <ul class="footer-links">
              <li><a routerLink="/catalog">Live Auctions</a></li>
              <li><a routerLink="/create">Post an Item</a></li>
              <li><a routerLink="/dashboard">My Bids & Won Deals</a></li>
              <li><a routerLink="/admin">Admin Portal</a></li>
            </ul>
          </div>

          <div class="footer-col contact-col">
            <h4 class="footer-heading">Contact Head Office</h4>
            <p><i class="fa-solid fa-location-dot"></i> Durbar Marg, Kathmandu, Nepal</p>
            <p><i class="fa-solid fa-envelope"></i> dealnepal&#64;auction.com.np</p>
            <p><i class="fa-solid fa-phone"></i> +977 9810 999 999</p>
            <p><i class="fa-solid fa-clock"></i> Mon - Sat: 9:00 AM - 7:00 PM</p>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 DealNepal. Built with Angular 18 Material UI & ASP.NET Core API. All Rights Reserved.</p>
          <div class="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span>•</span>
            <a href="#">Terms of Auction</a>
            <span>•</span>
            <a href="#">Escrow Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      padding: 60px 0 30px 0;
      color: var(--text-muted);
      margin-top: auto;
    }
    .footer-top {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
      gap: 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid #e2e8f0;
    }
    .footer-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
      font-size: 1.25rem;
    }
    .footer-desc {
      font-size: 0.9rem;
      line-height: 1.6;
      margin-bottom: 20px;
      color: var(--text-muted);
    }
    .social-links {
      display: flex;
      gap: 12px;
    }
    .social-links a {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--text-main);
      transition: var(--transition);
    }
    .social-links a:hover {
      background: var(--accent-primary);
      color: #ffffff;
      transform: translateY(-2px);
    }
    .footer-heading {
      color: #0f172a;
      font-weight: 700;
      font-size: 1rem;
      margin-bottom: 18px;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .footer-links a {
      font-size: 0.875rem;
      color: var(--text-muted);
      transition: var(--transition);
    }
    .footer-links a:hover {
      color: var(--accent-primary);
    }
    .contact-col p {
      font-size: 0.875rem;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .contact-col i {
      color: var(--accent-primary);
    }
    .footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 24px;
      font-size: 0.8rem;
    }
    .footer-bottom-links {
      display: flex;
      gap: 12px;
    }
    .footer-bottom-links a:hover {
      color: #0f172a;
    }
    @media (max-width: 992px) {
      .footer-top { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 640px) {
      .footer-top { grid-template-columns: 1fr; gap: 24px; }
      .footer-bottom { flex-direction: column; gap: 12px; text-align: center; }
    }
  `]
})
export class FooterComponent {}
