import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {catchError, map} from "rxjs";
import {AdminService} from "../../services/admin.service";
import {isAuth} from "../functions/is-auth";

export const adminGuard: CanActivateFn = (isAuthenticated: any = isAuth()) => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  return adminService.validateAdmin().pipe(
    map((isAdmin) => isAdmin),
    catchError(() => {
      return isAuthenticated ?
        router.navigateByUrl('/dashboard') :
        router.navigateByUrl('/login');
    })
  )
}
