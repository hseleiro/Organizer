import {AdminService} from "../../services/admin.service";
import {inject} from "@angular/core";

export function isAdmin() {
  const adminService = inject(AdminService);

  return adminService.isAdmin$.asObservable();
}
