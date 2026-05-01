import { Input } from '@shared/components';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from '@pages/login/login';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, Login],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.css',
  standalone: true,
})
export class AuthLayout {}
