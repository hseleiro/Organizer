import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../infrastructures/types/user";

@Injectable({providedIn: "root"})
export class UserRequestsService {
  private readonly http = inject(HttpClient);

  getUsers() {
    return this.http.get<User[]>('http://localhost:5005/app/users');
  }

  deleteUser(userId: number) {
    return this.http.delete<User>(`http://localhost:5005/app/users/${userId}`);
  }

}
