import { Component } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [ MatButtonModule, MatCardModule, MatInputModule ]
})
export class LoginComponent {}