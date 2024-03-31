import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  urlBase: string = 'http://localhost:9090/api/v1/users';

  private isLoggedInKey = 'is-logged-in';
  private userKey = 'user-data';

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(this.urlBase + "/login", credentials);
  }

  setUser(user: string): void {
    localStorage.setItem(this.userKey, user);
  }

  getUser(): string {
    return localStorage.getItem(this.userKey) || '';
  }

  // Método para establecer el estado de inicio de sesión en localStorage
  setLoggedIn(value: boolean): void {
    localStorage.setItem(this.isLoggedInKey, value ? 'true' : 'false');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.isLoggedInKey) === 'true';
  }

  logOut(): void {
    localStorage.removeItem(this.isLoggedInKey);
    localStorage.removeItem(this.userKey);
  }
}