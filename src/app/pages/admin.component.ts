import {Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'admin',
  template: `
    <router-outlet />`,
  imports: [
    RouterOutlet
  ],
  standalone: true
})
export class AdminComponent {}
