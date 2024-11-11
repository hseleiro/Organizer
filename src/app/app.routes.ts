import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/authorization/login";
import {authGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: async () => {
      const m = await import('./pages/dashboard.component');
      return m.DashboardComponent;
    }
  },
  { path: 'admin', canActivate: [authGuard], loadComponent: async () => {
    const m = await import('./pages/admin.component');
    return m.AdminComponent
    }}
];
