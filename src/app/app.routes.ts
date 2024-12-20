import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/authorization/login";
import {authGuard} from "./shared/guards/auth.guard";
import {adminGuard} from "./shared/guards/admin.guard";
import {NotFoundComponent} from "./pages/not-found.component";
import {adminRoleResolver} from "./shared/resolvers/is-admin.resolver";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',component: LoginComponent },
  { path: 'register', loadComponent: async () => {
    const m = await import('./pages/authorization/register');
    return m.RegisterComponent;
    }
  },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: async () => {
      const m = await import('./pages/dashboard.component');
      return m.DashboardComponent;
    },
    resolve: {
      isAdmin: adminRoleResolver
    },
  },
  { path: 'admin', canActivate: [adminGuard, authGuard], loadComponent: async () => {
      const m = await import('./pages/admin.component');
      return m.AdminComponent
    }
  },
  {
    path: 'users-list', canActivate: [adminGuard, authGuard], loadComponent: async () => {
      const component = await import('./pages/user/user-list.component')
      return component.UserListComponent;
    }
  },
  { path: '**', component: NotFoundComponent}
];
