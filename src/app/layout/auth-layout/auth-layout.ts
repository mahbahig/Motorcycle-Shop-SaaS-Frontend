import { Component, signal, inject, WritableSignal, input } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '@core/services';
import { CookieService } from 'ngx-cookie-service';
import { Input } from '@shared/components';

@Component({
  selector: 'app-auth-layout',
  imports: [Input, ReactiveFormsModule],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  standalone: true,
})
export class AuthLayout {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _cookieService = inject(CookieService);
  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  subscription: Subscription = new Subscription();
  showPassword: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  clicked: WritableSignal<boolean> = signal(false);

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

  showPasswordFn(): void {
    this.showPassword.set(!this.showPassword);
  }

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
        this._router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error.message);
        this.loginForm.reset();
      },
    });
  }

  // applyTheme = (theme: string) => {
  //     document.documentElement.setAttribute('data-theme', theme);
  //     localStorage.setItem('kp-theme', theme);
  //
  //     const isDark = theme === 'dark';
  //     // Update moon / sun icons
  //     // document.getElementById('login-moon-icon').style.display = isDark  ? 'inline' : 'none';
  //     // document!.getElementById('login-sun-icon').style.display  = !isDark ? 'inline' : 'none';
  //     // document!.getElementById('login-theme-label').textContent = isDark ? 'Dark' : 'Light';
  // }

  // toggleTheme = () => {
  //     const current = document.documentElement.getAttribute('data-theme') || 'dark';
  //     // this.applyTheme(current === 'dark' ? 'light' : 'dark');
  // }
}
