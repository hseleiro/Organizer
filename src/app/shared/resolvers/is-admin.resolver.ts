import { inject } from "@angular/core";
import {AdminService} from "../../services/admin.service";
import {catchError, map, of} from "rxjs";
import {ResolverDataService} from "../../services/resolver-data.service";

export const adminRoleResolver = () => {
  const adminService = inject(AdminService);
  const resolveDataService = inject(ResolverDataService)

  return adminService.validateAdmin().pipe(
    map(res => {
      const isAdmin = res.status === 'success';
      resolveDataService.setAdminPermission(isAdmin);
    }),
    catchError(() => {
      resolveDataService.setAdminPermission(false)
      return of(false)
    })
  );

};
