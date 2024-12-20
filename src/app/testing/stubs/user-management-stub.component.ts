import {Component, inject} from "@angular/core";
import {UserManagementService} from "../../services/user-management.service";

@Component({
  selector: 'user-management-stub',
  template: '',
  standalone: true
})
export class UserManagementStubComponent {
  private readonly service = inject(UserManagementService)
}
