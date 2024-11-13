import {inject} from "@angular/core";
import {RouteService} from "../../services/route.service";

export const routeListener = () => {
  const routeListenerService = inject(RouteService);
  return routeListenerService.routerListener$.asObservable();
}
