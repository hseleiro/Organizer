import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class UserService {
  private readonly http = inject(HttpClient);

}
