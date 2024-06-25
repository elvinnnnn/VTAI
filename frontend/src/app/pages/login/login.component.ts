import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { RouterLink, Router } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';

const AUTH_SERVER_URL = 'http://localhost:4000';
const SERVER_URL = 'http://localhost:3000';

interface LoginPayload {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private router: Router) {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  checkInvalid(field: string) {
    this.loginForm.get(field)?.invalid &&
      (this.loginForm.get(field)?.dirty || this.loginForm.get(field)?.touched);
  }

  async login(loginPayload: LoginPayload) {
    const loginRes = await fetch(AUTH_SERVER_URL + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
    });
    console.log(loginRes);
    if (!loginRes.ok) {
      const errorDetail = await loginRes.text();
      throw new Error(`Login failed: ${errorDetail}`);
    }
    const loginData = await loginRes.json();
    console.log(loginData);
    return loginRes;
  }

  onSubmit() {
    console.log(this.loginForm.value);
    // Do the API call here
    const loginPayload: LoginPayload = {
      username: this.loginForm.value.username ?? '',
      password: this.loginForm.value.password ?? '',
    };
    this.login(loginPayload)
      .then((res) => {
        this.router.navigateByUrl('/upload');
      })
      .catch((err) => console.log(err));
  }
}
