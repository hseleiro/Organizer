import {AuthService} from "../../services/auth.service";
import {inject} from "@angular/core";

export function isAuth(){
  const authService = inject(AuthService);
  return authService.isAuth$.asObservable();
}
