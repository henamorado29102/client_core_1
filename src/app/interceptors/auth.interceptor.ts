import type { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService)
  const token = storageService.getUser()?.accessToken ?? '';
  req = req.clone({
    setHeaders: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  })
  return next(req);
};
