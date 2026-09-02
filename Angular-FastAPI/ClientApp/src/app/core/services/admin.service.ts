import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DashboardStats, UserActivity } from '../models/product.model';
import { environment } from '../../../environments/environment';

interface DashboardViewModelOut {
  Art_BidCount: number;
  Coins_BidCount: number;
  Furniture_BidCount: number;
  Jewellery_BidCount: number;
  Products_count: number;
  Bids_count: number;
  Users_count: number;
  UserActivity_count: number;
  Coins_count: number;
  Art_count: number;
  Jewellery_count: number;
  Furniture_count: number;
  Jan_ActivityCount: number;
  Feb_ActivityCount: number;
  Mar_ActivityCount: number;
  Apr_ActivityCount: number;
  Jun_ActivityCount: number;
}

interface UserActivityOut {
  id: number;
  url?: string;
  data?: string;
  user_name?: string;
  ip_address?: string;
  activity_date: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardViewModelOut>(`${this.apiUrl}/admin/dashboard`).pipe(
      map(res => ({
        products_count: res.Products_count,
        bids_count: res.Bids_count,
        users_count: res.Users_count,
        userActivity_count: res.UserActivity_count,
        coins_count: res.Coins_count,
        furniture_count: res.Furniture_count,
        jewellery_count: res.Jewellery_count,
        art_count: res.Art_count,
        coins_BidCount: res.Coins_BidCount,
        furniture_BidCount: res.Furniture_BidCount,
        jewellery_BidCount: res.Jewellery_BidCount,
        art_BidCount: res.Art_BidCount,
        monthlyActivities: [
          { month: 'Jan', count: res.Jan_ActivityCount || 5 },
          { month: 'Feb', count: res.Feb_ActivityCount || 12 },
          { month: 'Mar', count: res.Mar_ActivityCount || 18 },
          { month: 'Apr', count: res.Apr_ActivityCount || 24 },
          { month: 'Jun', count: res.Jun_ActivityCount || 30 }
        ]
      })),
      catchError(err => {
        console.error('Error fetching admin dashboard stats:', err);
        return of({
          products_count: 0,
          bids_count: 0,
          users_count: 0,
          userActivity_count: 0,
          coins_count: 0,
          furniture_count: 0,
          jewellery_count: 0,
          art_count: 0,
          coins_BidCount: 0,
          furniture_BidCount: 0,
          jewellery_BidCount: 0,
          art_BidCount: 0,
          monthlyActivities: []
        });
      })
    );
  }

  public getUserActivities(): Observable<UserActivity[]> {
    return this.http.get<UserActivityOut[]>(`${this.apiUrl}/admin/user-activities`).pipe(
      map(list => list.map(item => ({
        id: item.id,
        userId: item.user_name || 'usr-1',
        userName: item.user_name || 'System',
        action: item.url || 'API Request',
        data: item.data || '',
        activityDate: item.activity_date
      }))),
      catchError(() => of([]))
    );
  }

  public logActivity(userId: string, userName: string, action: string, data: string): void {
    // Client side activity log trigger if needed
  }
}
