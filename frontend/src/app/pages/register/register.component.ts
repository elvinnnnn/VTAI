import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { NavbarComponent } from '../../navbar/navbar.component';
import { response } from 'express';
import { error } from 'console';

const AUTH_SERVER_URL = 'http://localhost:4000';
const SERVER_URL = 'http://localhost:3000';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  router = inject(Router);

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  checkInvalid(field: string) {
    return (
      this.registerForm.get(field)?.invalid &&
      (this.registerForm.get(field)?.dirty ||
        this.registerForm.get(field)?.touched)
    );
  }

  async register(registerPayload: RegisterPayload) {
    try {
      const registerRes = await fetch(AUTH_SERVER_URL + '/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerPayload),
      });
      if (!registerRes.ok) throw new Error('Register Failed');
      this.router.navigateByUrl('/login');
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  onSubmit() {
    if (
      !this.registerForm.get('username')?.invalid &&
      !this.registerForm.get('password')?.invalid &&
      !this.registerForm.get('email')?.invalid
    ) {
      const registerPayload: RegisterPayload = {
        username: this.registerForm.value.username ?? '',
        email: this.registerForm.value.email ?? '',
        password: this.registerForm.value.password ?? '',
      };

      this.register(registerPayload)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
