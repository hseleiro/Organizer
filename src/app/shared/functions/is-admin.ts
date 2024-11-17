import {ResolverDataService} from "../../services/resolver-data.service";
import {inject} from "@angular/core";

export const isAdmin = () => {
  const resolverService = inject(ResolverDataService)
  return resolverService.isAdmin$.asObservable();
}
