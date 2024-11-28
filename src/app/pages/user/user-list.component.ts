import {Component, signal} from "@angular/core";
import {User} from "../../infrastructures/types/user";

@Component({
  selector: 'users-list',
  template: `
    <div>Users List</div>
    <div>Number of users: {{users().length}}</div>
    <ul>
      @for (user of users(); track user._id) {
        <li>
          {{user.first_name}}
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
  users = signal<User[]>([
    {
      _id: 1,
      first_name: 'Hugo',
      last_name: 'Seleiro',
      email: 'teste@mail.com',
      role: '0x88'
    },
    {
      _id: 2,
      first_name: 'Albino',
      last_name: 'Cosme',
      email: 'test2e@mail.com',
      role: '0x01'
    }
  ]);

  deleteUser(id: number) {
    this.users.update((users) => {
      return users.filter((user) => user._id !== id)
    })
  }
}
