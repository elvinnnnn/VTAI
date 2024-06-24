import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { consumerPollProducersForChange } from '@angular/core/primitives/signals';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar.component';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [ NavbarComponent, RouterLink, MatButtonModule, MatCardModule, MatInputModule, ReactiveFormsModule ]
})
export class LoginComponent {
    registerForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })

    checkInvalid (field: string) {
        this.registerForm.get(field)?.invalid && (this.registerForm.get(field)?.dirty || this.registerForm.get(field)?.touched)
    }

    onSubmit () {
        console.log(this.registerForm.value)
        // Do the API call here
    }

    constructor(private fb: FormBuilder) {

    }
}