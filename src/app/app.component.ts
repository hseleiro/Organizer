import {AsyncPipe, NgIf} from "@angular/common";
import {Component} from '@angular/core';
import {isAuth} from "./shared/functions/is-auth";
import {RouterOutlet} from '@angular/router';
import {ToolbarComponent} from "./shared/components/toolbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    RouterOutlet,
    ToolbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isAuth$ = isAuth();
  title = 'organizer';
}
