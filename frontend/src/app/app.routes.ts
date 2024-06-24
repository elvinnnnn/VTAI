import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UploadComponent } from './pages/upload/upload.component';
import { PlayerComponent } from './pages/player/player.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/register',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login Page'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page'
    },
    {
        path: 'upload',
        component: UploadComponent,
        title: 'Upload Page'
    },
    {
        path: 'player',
        component: PlayerComponent,
        title: 'Player Page'
    }
  ];

