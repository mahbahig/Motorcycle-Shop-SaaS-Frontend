import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { authApiEndpoints } from '@common/environments/environment';
import { ILoginRequest, IUpdatePasswordRequest } from '@shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly cookieService: CookieService,
    private readonly router: Router,
  ) {}
  decoded!: WritableSignal<any>;

  login(data: ILoginRequest): Observable<any> {
    return this.httpClient.post(authApiEndpoints.login, data);
  }

  updatePassword(body: IUpdatePasswordRequest): Observable<any> {
    return this.httpClient.patch(authApiEndpoints.updatePassword, body);
  }

  resetPassword(userId: string): Observable<any> {
    return this.httpClient.patch(`${authApiEndpoints.resetPassword}/${userId}`, undefined);
  }

  logout() {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/login']);
  }

  decodeToken() {
    try {
      this.decoded.set(jwtDecode(this.cookieService.get('token')));
      return this.decoded();
    } catch (err) {
      this.router.navigate(['/login']);
    }
  }
}
