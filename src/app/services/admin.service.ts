import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AdminService {
  private readonly http = inject(HttpClient);
  isAdmin$ = new BehaviorSubject(false)

  validateAdmin(): Observable<any> {
    return this.http.get('http://localhost:5005/app/admin', { withCredentials: true }).pipe(
      tap(() => this.isAdmin$.next(true))
    )
  }
}
