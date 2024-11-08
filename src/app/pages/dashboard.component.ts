import {Component, inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard',
  template: `
    <div>Dashboard</div>
    <div (click)="logout()">Logout</div>
  `,
  standalone: true,
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigateByUrl('/login')
    });
  }
}
