import {Component, inject} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatToolbar, MatToolbarRow} from "@angular/material/toolbar";
import {MatMenu, MatMenuItem, MatMenuModule} from "@angular/material/menu";
import {AsyncPipe, NgIf} from "@angular/common";
import {ResolverDataService} from "../../services/resolver-data.service";

@Component({
  selector: 'toolbar',
  template: `
    <mat-toolbar>
      <mat-toolbar-row class="tool-bar-row">
        <span>Organize app</span>
        <span class="spacer"></span>
        <button
          mat-icon-button
          [matMenuTriggerFor]="belowMenu"
          class="icon"
          aria-label="icon-button with menu icon">
          <mat-icon>menu</mat-icon>
        </button>
      </mat-toolbar-row>
    </mat-toolbar>

    <mat-menu class="menu" #belowMenu="matMenu">
      <button
        *ngIf="(isAdmin$ | async) && router.url !== '/admin'"
        (click)="navigateToAdmin()"
        mat-menu-item
      >Admin
      </button>
      <button (click)="logout()" mat-menu-item>Logout</button>
    </mat-menu>
  `,
  styles: [`
    mat-toolbar {
      width: 100%;
    }

    .tool-bar-row {
      background-color: #fffa65;
      color: #4b4b4b;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .icon {
      padding: 0 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `],
  imports: [
    MatIcon,
    MatIconButton,
    MatToolbar,
    MatToolbarRow,
    MatMenu,
    MatMenuItem,
    MatMenuModule,
    AsyncPipe,
    NgIf
  ],
  standalone: true
})
export class ToolbarComponent {
  private readonly authService = inject(AuthService);
  isAdmin$ = inject(ResolverDataService).isAdmin$;
  router = inject(Router);

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }

  navigateToAdmin() {
    this.router.navigateByUrl('/admin');
  }
}
