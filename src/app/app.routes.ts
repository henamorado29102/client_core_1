import { Routes, Route } from '@angular/router';
import { authGuard, loginGuard } from './guards/auth.guard';

declare module '@angular/router' {
    interface Route {
      icon?: string;
    }
  }

export const routes: Routes = [
    {
        path: "dashboard",
        title: 'DashBoard',
        canActivate: [authGuard],
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'change-detection',
                title: 'Change Detection',
                icon: 'folder_shared',
                loadComponent: () => import('./dashboard/pages/change-detection/change-detection.component')
            },
            {
                path: 'control-flow',
                title: 'Control Flow',
                icon: 'sync',
                loadComponent: () => import('./dashboard/pages/control-flow/control-flow.component')
            },
            {
                path: 'defer-options',
                title: 'Defer Options',
                icon: 'moving_beds',
                loadComponent: () => import('./dashboard/pages/defer-options/defer-options.component')
            },
            {
                path: 'user-list',
                title: 'User List',   
                icon: 'group',             
                loadComponent: () => import('./dashboard/pages/users/users.component')
            },
            {
                path: 'update-user/:id',
                title: 'Add User',
                loadComponent: () => import('./dashboard/pages/add-user/add-user.component')
            },
            {
                path: 'add-user',
                title: 'Add User',
                loadComponent: () => import('./dashboard/pages/add-user/add-user.component')
            },
            {
                path: 'life-cicle',
                title: 'Life cicle',
                icon: 'cached',
                loadComponent: () => import('./dashboard/pages/life-cycle/life-cycle.component')
            }
        ]
    },
    {
        path: 'login',
        canActivate: [loginGuard],
        loadComponent: () => import('./dashboard/pages/login/login.component')
    },
    {
        path: '**',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    
];
