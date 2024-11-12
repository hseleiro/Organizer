import {inject} from "@angular/core";
import {RouteListenerService} from "../../services/route-listener.service";

export const routeListener = () => {
  const routeListenerService = inject(RouteListenerService);
  return routeListenerService.routerListener$.asObservable();
}
