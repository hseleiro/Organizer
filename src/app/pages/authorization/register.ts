import {Component} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: 'register',
  template: `
  <div>Register</div>
  `,
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
}
