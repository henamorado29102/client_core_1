import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {  
  console.log('authGuard')
  const storageService = inject(StorageService);
  const router = inject(Router);
  console.log(storageService.getUser())
  if (storageService.isLoggedIn()) {   
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

export const loginGuard: CanActivateFn = (route, state) => {  
  console.log('loginGuard')
  const storageService = inject(StorageService);
  const router = inject(Router);
  console.log(storageService.getUser())
  if (!storageService.isLoggedIn()) {   
    return true;
  } else {
    router.navigate(['dashboard']);
    return false;
  }
};