import {Component} from "@angular/core";
import {ToolbarComponent} from "../shared/components/toolbar.component";

@Component({
  selector: 'dashboard',
  template: `
    <div>Dashboard</div>
  `,
  standalone: true,
  imports: [
    ToolbarComponent
  ]
})
export class DashboardComponent {}
