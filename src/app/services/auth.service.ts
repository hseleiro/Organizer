import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {UserInterface} from "../infrastructures/interfaces/user.interface";

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly http = inject(HttpClient);
  isAuth$ = new BehaviorSubject(false);

  login(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>('http://localhost:5005/app/auth/login', user, { withCredentials: true });
  }

  validateSession(): Observable<any> {
    return this.http.get('http://localhost:5005/app/user', { withCredentials: true });
  }

  logout() {
    return this.http.get('http://localhost:5005/app/auth/logout', { withCredentials: true });
  }
}
