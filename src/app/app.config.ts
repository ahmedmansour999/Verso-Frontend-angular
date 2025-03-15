import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import {
  provideCacheableAnimationLoader,
  provideLottieOptions,
} from 'ngx-lottie';
import player from 'lottie-web';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
  withI18nSupport,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { HttpClient, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './Interceptors/loading.interceptor';
import { errorPageInterceptor } from './Interceptors/error-page.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes ,  withPreloading(PreloadAllModules)),
    provideClientHydration(withEventReplay(), withI18nSupport() ),
    provideAnimationsAsync(),
    provideLottieOptions({ player: () => player }),
    provideCacheableAnimationLoader(),
    provideNativeDateAdapter(),
    provideHttpClient(
      withInterceptors([loadingInterceptor , errorPageInterceptor])
    ) ,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
        defaultLanguage: 'en',
      })
    ),

  ],
};
