import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {ToolbarComponent} from "./shared/components/toolbar.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {isAuth} from "./shared/functions/is-auth";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    AsyncPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  router = inject(Router)
  isAuth$ = isAuth();
}
