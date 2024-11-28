import {Component, inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'register',
  template: `
    <div>Register</div>
    <form [formGroup]="form">
      <label>First Name:</label>
      <input type="text" name="first_name" formControlName="first_name"/>
      <label>Last Name</label>
      <input type="text" name="last_name" formControlName="last_name"/>
      <label>Email</label>
      <input type="email" name="email" formControlName="email" />
      <label>Password</label>
      <input type="password" name="password" formControlName="password"/>
    </form>
    <button (click)="register()">Register</button>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule
  ]
})
export class RegisterComponent implements OnInit {
  form!: FormGroup
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly route = inject(Router)

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: ['']
    })
  }

  register() {
    this.authService.register(this.form.value).subscribe(() => {
      this.route.navigateByUrl('/login')
    });
  }

}
