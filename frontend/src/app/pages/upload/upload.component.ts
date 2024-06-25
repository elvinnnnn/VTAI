import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
const AUTH_SERVER_URL = 'http://localhost:4000';
const SERVER_URL = 'http://localhost:3000';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  standalone: true,
  imports: [NavbarComponent],
})
export class UploadComponent {
  token = localStorage.getItem('accessToken');
  songs: any;

  constructor() {
    this.getSongs(this.token ?? '');
  }

  getSongs(token: string) {
    fetch(SERVER_URL + '/songs', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        this.songs = res;
      })
      .catch((err) => console.log(err));
  }
}
