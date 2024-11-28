import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {User} from "../infrastructures/types/user";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly http = inject(HttpClient);
  isAuth$ = new BehaviorSubject(false);

  login(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:5005/app/auth/login', user, { withCredentials: true });
  }

  register(user: User) {
    return this.http.post<User>('http://localhost:5005/app/auth/register', user);
  }

  logout() {
    return this.http.get('http://localhost:5005/app/auth/logout', { withCredentials: true }).pipe(
        tap(() => this.isAuth$.next(false))
    );
  }

  validateSession(): Observable<any> {
    return this.http.get('http://localhost:5005/app/user', { withCredentials: true }).pipe(
        tap(() => this.isAuth$.next(true))
    );
  }

}
