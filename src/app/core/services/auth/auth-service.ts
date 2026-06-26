import { HttpClient } from '@angular/common/http';
import { Service, inject, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { authApiEndpoints } from '@common/environments/environment';
import { LoginRequest, LoginResponse, UpdatePasswordRequest } from '@shared/interfaces';

@Service()
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  decoded!: WritableSignal<JwtPayload>;

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(authApiEndpoints.login, data);
  }

  updatePassword(body: UpdatePasswordRequest): Observable<unknown> {
    return this.httpClient.patch(authApiEndpoints.updatePassword, body);
  }

  resetPassword(userId: string): Observable<unknown> {
    return this.httpClient.patch(`${authApiEndpoints.resetPassword}/${userId}`, undefined);
  }

  logout() {
    this.cookieService.delete('token', '/');
    this.router.navigate(['/login']);
  }

  decodeToken(): JwtPayload | undefined {
    try {
      this.decoded.set(jwtDecode(this.cookieService.get('token')));
      return this.decoded();
    } catch (err) {
      this.router.navigate(['/login']);
      return undefined;
    }
  }
}
