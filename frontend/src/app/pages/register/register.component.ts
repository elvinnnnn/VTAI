import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { RouterLink } from '@angular/router';
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ NavbarComponent, RouterLink, MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
  })

  checkInvalid (field: string) {
      this.registerForm.get(field)?.invalid && (this.registerForm.get(field)?.dirty || this.registerForm.get(field)?.touched)
  }

  onSubmit () {
      console.log(this.registerForm.value)
  }

  constructor(private fb: FormBuilder) {

  }
}
