import { Component, inject, signal, WritableSignal, computed } from '@angular/core';
import { Input } from '@shared/components';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '@core/services';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ThemeService } from '@core/services/theme/theme-service';
import { Button } from '@shared/components/button/button';
import { Alert } from '@shared/components/alert/alert';

@Component({
  selector: 'app-login',
  imports: [Input, ReactiveFormsModule, Button, Alert],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _cookieService = inject(CookieService);
  private readonly _authService = inject(AuthService);
  public readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);

  subscription: Subscription = new Subscription();
  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  clicked: WritableSignal<boolean> = signal(false);

  // ── Derived ──────────────────────────────────────────
  readonly hasError = computed(() => this.clicked() && this.errorMessage() !== '');

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  loginForm: FormGroup = this._formBuilder.group({
    username: [null, [Validators.required, Validators.minLength(3)]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  ngOnInit(): void {}

  loginSubmit(): void {
    this.clicked.set(!this.clicked());
    if (this.isLoading()) return;
    if (this.username!.invalid) return this.errorMessage.set('اسم المستخدم مطلوب');
    if (this.password!.invalid)
      return this.errorMessage.set('يجب أن تتكون كلمة المرور من أكثر من 6 أحرف');
    this.isLoading.set(true);
    this.subscription.unsubscribe();
    this.subscription = this._authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        console.log(res);
        if (!res.success) this.errorMessage.set(res.message);
        this._cookieService.set('token', res.token);
        this._router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message);
        this.loginForm.reset();
      },
    });
  }
}
