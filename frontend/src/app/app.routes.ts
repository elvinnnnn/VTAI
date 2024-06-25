import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UploadComponent } from './pages/upload/upload.component';
import { PlayerComponent } from './pages/player/player.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'upload',
    component: UploadComponent,
    title: 'Video Upload',
  },
  {
    path: 'player',
    component: PlayerComponent,
    title: 'Video Player',
  },
];
