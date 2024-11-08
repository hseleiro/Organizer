import {Component, inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'toolbar',
  template: `
  <div>Toolbar</div>
  <div (click)="logout()">logout</div>
  `,
  standalone: true
})
export class ToolbarComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login')
    });
  }
}
