import {inject, Injectable} from "@angular/core";
import {UserRequestsService} from "./user-requests.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {merge, of, Subject, switchMap} from "rxjs";
import {User} from "../infrastructures/types/user";

@Injectable({providedIn: "root"})
export class UserManagementService {
  private readonly userRequestService = inject(UserRequestsService)
  deleteUser$ = new Subject<number>();

  users = toSignal(
    merge(
      of(null),
      this.deleteUser$.pipe(switchMap((r) =>
        this.userRequestService.deleteUser(r))),
    ).pipe(
      switchMap(() => {
        return this.userRequestService.getUsers()
      })
    ),
    {
      initialValue: [] as User[],
    }
  );

  deleteUser(id: number) {
    this.deleteUser$.next(id);
  }

}
