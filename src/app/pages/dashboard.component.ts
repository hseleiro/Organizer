import {Component} from "@angular/core";
import {ToolbarComponent} from "../shared/components/toolbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'dashboard',
  template: `
    <router-outlet />
  `,
  standalone: true,
  imports: [
    ToolbarComponent,
    RouterOutlet
  ]
})
export class DashboardComponent {}
