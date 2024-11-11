import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {map, catchError, of} from "rxjs";
import {AdminService} from "../../services/admin.service";

export const adminGuard: CanActivateFn = () => {
  const adminService = inject(AdminService);
  const router = inject(Router);

  return adminService.validateAdmin().pipe(
    map(() => true),
    catchError(() => (router.navigateByUrl('/dashboard'), of(false)))
  );
}
