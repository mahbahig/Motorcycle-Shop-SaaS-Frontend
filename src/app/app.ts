import { Component, OnInit, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ThemeService } from '@core/services/theme/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('motorco-frontend');
  private readonly _themeService = inject(ThemeService);

  ngOnInit(): void {
    initFlowbite();
  }
}
