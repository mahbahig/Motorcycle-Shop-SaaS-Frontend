import { Component, inject, signal, computed } from '@angular/core';
import { Input } from '@common/components';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Button } from '@common/components/button/button';
import { Alert } from '@common/components/alert/alert';
import { ILoginRequest } from '@common/interfaces/auth';
import { form, minLength, required, submit, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-login',
  imports: [Input, Button, Alert, FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly _authService = inject(AuthService);
  private readonly _cookieService = inject(CookieService);
  private readonly _router = inject(Router);

  readonly serverError = signal('');
  readonly isSuccess = signal(false);
  readonly hasError = computed(() => this.serverError() !== '');
  readonly errorMessage = this.serverError;
  currentYear = signal(new Date().getFullYear());

  readonly loginModel = signal<ILoginRequest>({ username: '', password: '', rememberMe: false });

  readonly loginForm = form(this.loginModel, (path) => {
    required(path.username, { message: 'اسم المستخدم مطلوب' });
    required(path.password, { message: 'كلمة المرور مطلوبة' });
    minLength(path.password, 6, { message: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل' });
  });

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.serverError.set('');
    this.isSuccess.set(false);

    await submit(this.loginForm, async (f) => {
      try {
        const res = await firstValueFrom(this._authService.login(f().value()));

        if (!res.success) {
          this.serverError.set(res.message);
          return [{ kind: 'server', message: res.message }];
        }

        this.isSuccess.set(true);
        this._cookieService.set('token', res.token, undefined, '/');
        this._router.navigate(['/dashboard']);
        return undefined;
      } catch {
        const message = 'اسم المستخدم أو كلمة المرور غير صحيحة';
        this.serverError.set(message);
        return [{ kind: 'server', message }];
      }
    });
  }
}
