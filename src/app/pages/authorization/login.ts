import {Component, inject, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'login',
  template: `
    <div>Login</div>
    <form [formGroup]="form">
      <fieldset>
        <legend>Login</legend>
        <div class="form-field">
          <label>Email:</label>
          <input name="email" formControlName="email">
        </div>
        <div class="form-field">
          <label>Password:</label>
          <input name="password" formControlName="password" type="password">
        </div>
      </fieldset>
      <div class="form-buttons">
        <button class="button button-primary" (click)="login()">
          Login
        </button>
      </div>
    </form>
  `,
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    if (this.form.valid) {
      this.auth.login(this.form.value).subscribe()
    }
  }
}
