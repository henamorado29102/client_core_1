import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
   // {provide: BACKEND_URL, useValue: 'https://photoapp.looknongmodules.com/api'},
    provideAnimations(),
    provideRouter(
      routes, 
      withViewTransitions({skipInitialTransition: true}),
      withComponentInputBinding()
    ),
    provideHttpClient(withInterceptors([authInterceptor])),
    importProvidersFrom(
      HttpClientModule, FormsModule, ReactiveFormsModule
    )
  ],
    

};