import {
  ApplicationConfig,
  APP_INITIALIZER,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headersInterceptor } from '@common/interceptors/headers/headers-interceptor';
import { ThemeService } from '@core/services/theme/theme-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headersInterceptor,
        // errorInterceptor,
        // successInterceptor,
        // loadingInterceptor,
      ]),
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (themeService: ThemeService) => () => themeService.initializeTheme(),
      deps: [ThemeService],
      multi: true,
    },
  ],
};
