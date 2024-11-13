import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'dashboard',
  template: `
    <div>Dashboard</div>
  `,
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class DashboardComponent {}
