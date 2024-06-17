import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {    
  const storageService = inject(StorageService);
  const router = inject(Router);  
  if (storageService.isLoggedIn()) {   
    return true;
  } else {
    router.navigate(['login']);
    return false;
  }
};

export const loginGuard: CanActivateFn = (route, state) => {    
  const storageService = inject(StorageService);
  const router = inject(Router);  
  if (!storageService.isLoggedIn()) {   
    return true;
  } else {
    router.navigate(['dashboard']);
    return false;
  }
};