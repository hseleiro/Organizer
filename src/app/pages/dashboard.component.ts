import {Component, inject} from "@angular/core";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";
import {ResolverDataService} from "../services/resolver-data.service";

@Component({
  selector: 'dashboard',
  template: `
    <div>Dashboard</div>
    <div *ngIf="isAdmin$ | async">Welcome Back - You are an admin</div>
    <div *ngIf="!(isAdmin$ | async)">You are NOT admin</div>
  `,
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    AsyncPipe
  ]
})
export class DashboardComponent {
  private readonly route = inject(ActivatedRoute);
  isAdmin$ = inject(ResolverDataService).isAdmin$;
}
