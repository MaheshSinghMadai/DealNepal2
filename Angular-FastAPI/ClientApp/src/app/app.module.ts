import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';

// Shared Components
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CountdownTimerComponent } from './shared/countdown-timer/countdown-timer.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';

// Pages
import { HomeComponent } from './main/pages/home/home.component';
import { CatalogComponent } from './main/pages/catalog/catalog.component';
import { ProductComponent } from './main/pages/product/product.component';
import { CreateAuctionComponent } from './main/pages/create-auction/create-auction.component';
import { UserDashboardComponent } from './main/pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

// Auth
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    CountdownTimerComponent,
    ProductCardComponent,
    HomeComponent,
    CatalogComponent,
    ProductComponent,
    CreateAuctionComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

