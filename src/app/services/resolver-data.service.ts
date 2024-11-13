import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ResolverDataService {
  private isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin.asObservable();

  setAdmin(isAdmin: boolean) {
    this.isAdmin.next(isAdmin)
  }
}
