import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, filter} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";

@Injectable({providedIn: "root"})
export class RouteListenerService {
  private readonly route = inject(Router);
  routerListener$ = new BehaviorSubject('');

  constructor() {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      this.routerListener$.next(event.urlAfterRedirects);
    });
  }
}
