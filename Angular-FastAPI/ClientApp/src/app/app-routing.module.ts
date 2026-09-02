import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './main/pages/home/home.component';
import { CatalogComponent } from './main/pages/catalog/catalog.component';
import { ProductComponent } from './main/pages/product/product.component';
import { CreateAuctionComponent } from './main/pages/create-auction/create-auction.component';
import { UserDashboardComponent } from './main/pages/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'create', component: CreateAuctionComponent },
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
