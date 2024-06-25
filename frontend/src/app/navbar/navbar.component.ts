import { Component, Input, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const AUTH_SERVER_URL = 'http://localhost:4000';
const SERVER_URL = 'http://localhost:3000';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);
  @Input() isAuth = false;

  onLogout() {
    fetch(AUTH_SERVER_URL + '/logout', {
      method: 'DELETE',
    })
      .then((res) => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigateByUrl('/login');
      })
      .catch((err) => console.log(err));
  }
}
