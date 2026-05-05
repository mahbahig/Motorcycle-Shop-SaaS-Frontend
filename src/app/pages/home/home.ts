import { Component, inject } from '@angular/core';
import { AuthService } from '@core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
  private readonly _authService = inject(AuthService);

  signOut(): any {
    this._authService.logOut();
  }
}
