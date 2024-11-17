import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ResolverDataService {
  isAdmin$ = new BehaviorSubject<boolean>(false);

  setAdminPermission(isAdmin: boolean) {
    this.isAdmin$.next(isAdmin)
  }
}
