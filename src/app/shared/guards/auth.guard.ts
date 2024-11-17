import {CanActivateFn, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {inject} from "@angular/core";
import {catchError, map} from "rxjs";

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateSession().pipe(
    map((isAuth) => isAuth),
    catchError(() => {
      return router.navigateByUrl('/login')
    })
  )
}
