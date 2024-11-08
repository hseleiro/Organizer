import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ToolbarComponent} from "./shared/components/toolbar.component";
import {isAuth} from "./shared/functions/is-auth";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToolbarComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isAuth$ = isAuth();
  title = 'organizer';
}
