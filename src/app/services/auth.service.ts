import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInterface} from "../infrastructures/interfaces/user.interface";

@Injectable()
export class AuthService {
  private readonly http = inject(HttpClient);

  login(user: UserInterface): Observable<UserInterface> {
    return this.http.post<UserInterface>('http://localhost:5005/app/auth/login', user)
  }

}
