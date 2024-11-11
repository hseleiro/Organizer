import {CanActivateFn, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AdminService} from "../../services/admin.service";
import {inject} from "@angular/core";
import {map, catchError, of, forkJoin} from "rxjs";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const adminService = inject(AdminService);
  const router = inject(Router);

  return forkJoin([
    authService.validateSession(),
    adminService.validateAdmin(),
  ]).pipe(
    map(() => {
      return true;
    }),
    catchError(() => {
      router.navigateByUrl('/login');
      return of(false);
    })
  );
}
