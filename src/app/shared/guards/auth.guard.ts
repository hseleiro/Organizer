import {CanActivateFn, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {inject} from "@angular/core";
import {map, catchError, of} from "rxjs";

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.validateSession().pipe(
        map(() => true),
        catchError(() => (router.navigateByUrl('/login'), of(false)))
    );
}
