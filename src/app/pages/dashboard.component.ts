import {Component} from "@angular/core";
import {AsyncPipe, NgIf} from "@angular/common";
import {isAdmin} from "../shared/functions/is-admin";

@Component({
  selector: 'dashboard',
  template: `
    <div>Dashboard</div>
    <div *ngIf="isAdmin$ | async">Welcome Back you are admin</div>
    <div *ngIf="!(isAdmin$ | async)">You are NOT admin</div>
  `,
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe
  ]
})
export class DashboardComponent {
  isAdmin$ = isAdmin();

}
