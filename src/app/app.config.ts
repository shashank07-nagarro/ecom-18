import {
  ApplicationConfig,
  provideZoneChangeDetection,
  provideExperimentalZonelessChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';

import { reducers } from './store/reducers';
import { metaReducers } from './meta-reducers';
import { loadState } from './local-storage';
import { provideEffects } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const isBrowser =
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
const initialState = isBrowser ? loadState('ngrx-state') : undefined;

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    //provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers, { metaReducers, initialState }),
    provideEffects([ProductEffects]),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    //provideClientHydration(),
    importProvidersFrom([FormsModule, ReactiveFormsModule]), provideAnimationsAsync(),
  ],
};
