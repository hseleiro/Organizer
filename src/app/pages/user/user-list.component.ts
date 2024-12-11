import {Component, inject} from "@angular/core";
import {UserManagementService} from "../../services/user-management.service";

@Component({
  selector: 'users-list',
  template: `
    <div>Users List</div>
    <div>Number of users: {{users().length}}</div>
    <ul>
      @for (user of users(); track user._id) {
        <li>
          {{user.first_name}}
          {{user._id}}
          <button (click)="deleteUser(user._id ?? 1)">Delete User</button>
        </li>
      } @empty {
        <li>No users available.</li>
      }
    </ul>
  `,
  imports: [],
  standalone: true
})
export class UserListComponent {
  private readonly userManagementService = inject(UserManagementService);

  users = this.userManagementService.users;

  deleteUser(id: number) {
    this.userManagementService.deleteUser(id)
  }

}
