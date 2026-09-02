import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { tap, catchError, map, switchMap } from 'rxjs/operators';
import { User } from '../models/product.model';
import { environment } from '../../../environments/environment';

interface TokenResponse {
  access_token: string;
  token_type: string;
}

interface UserOutResponse {
  id: string;
  email: string;
  username: string;
  first_name?: string;
  last_name?: string;
  username_change_limit: number;
  is_active: boolean;
  roles: { id: number; name: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedUser = localStorage.getItem('dealnepal_user');
    const token = localStorage.getItem('dealnepal_token');
    if (savedUser && token) {
      try {
        this.currentUserSubject.next(JSON.parse(savedUser));
        // Verify current session with backend
        this.fetchCurrentUser().subscribe({
          error: () => this.logout()
        });
      } catch (e) {
        this.logout();
      }
    }
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public fetchCurrentUser(): Observable<User> {
    return this.http.get<UserOutResponse>(`${this.apiUrl}/auth/me`).pipe(
      map(res => this.mapUserResponse(res)),
      tap(user => {
        localStorage.setItem('dealnepal_user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  public login(username: string, password?: string, role: 'Admin' | 'Auctioneer' | 'User' = 'Admin'): Observable<User> {
    const pwd = password || 'Admin@123';
    return this.http.post<TokenResponse>(`${this.apiUrl}/auth/login/json`, {
      username: username,
      password: pwd
    }).pipe(
      tap(res => {
        localStorage.setItem('dealnepal_token', res.access_token);
      }),
      switchMap(() => this.fetchCurrentUser()),
      catchError(err => {
        console.error('Login failed on backend:', err);
        return throwError(() => new Error(err?.error?.detail || 'Authentication failed'));
      })
    );
  }

  public register(userData: Partial<User> & { password?: string }): Observable<User> {
    const payload = {
      email: userData.email || `${userData.username}@dealnepal.com`,
      username: userData.username || 'newuser',
      password: userData.password || 'Password123!',
      first_name: userData.firstName || userData.username,
      last_name: userData.lastName || 'User'
    };

    return this.http.post<UserOutResponse>(`${this.apiUrl}/auth/register`, payload).pipe(
      switchMap(() => this.login(payload.username, payload.password))
    );
  }

  public logout(): void {
    localStorage.removeItem('dealnepal_token');
    localStorage.removeItem('dealnepal_user');
    this.currentUserSubject.next(null);
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<UserOutResponse[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.map(u => this.mapUserResponse(u))),
      catchError(() => of([]))
    );
  }

  public switchRole(role: 'Admin' | 'Auctioneer' | 'User'): void {
    const currentUser = this.currentUserValue;
    if (currentUser) {
      currentUser.role = role;
      localStorage.setItem('dealnepal_user', JSON.stringify(currentUser));
      this.currentUserSubject.next({ ...currentUser });
    }
  }

  private mapUserResponse(res: UserOutResponse): User {
    const primaryRole = (res.roles && res.roles.length > 0) ? res.roles[0].name : 'User';
    return {
      id: res.id,
      username: res.username,
      firstName: res.first_name || res.username,
      lastName: res.last_name || '',
      email: res.email,
      role: (primaryRole as 'Admin' | 'Auctioneer' | 'User'),
      profilePictureUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80'
    };
  }
}
