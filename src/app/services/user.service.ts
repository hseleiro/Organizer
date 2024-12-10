import {inject, Injectable, signal} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../infrastructures/types/user";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly http = inject(HttpClient);
  #users = signal<User[]>([]);
  users = this.#users.asReadonly();

  users$ = this.http.get<User[]>('http://localhost:5005/app/users');

  connect() {
    return this.users$.pipe(
      takeUntilDestroyed(),
    ).subscribe(users => {
        this.#users.set(users)
    })
  }

}
