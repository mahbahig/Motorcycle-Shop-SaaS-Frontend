import { Component } from '@angular/core';
import { Login } from '@pages/login/login';

@Component({
  selector: 'app-auth-layout',
  imports: [Login],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  standalone: true,
})
export class AuthLayout {
  features: string[] = ['']
}
