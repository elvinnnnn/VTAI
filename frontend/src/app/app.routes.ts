import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UploadComponent } from './pages/upload/upload.component';
import { PlayerComponent } from './pages/player/player.component';

export const routes: Routes = [
    {
        path: 'login',
        title: 'Login Page',
        component: LoginComponent
    },
    {
        path: 'upload',
        title: 'Upload Page',
        component: UploadComponent
    },
    {
        path: 'player',
        title: 'Player Page',
        component: PlayerComponent
    }
];

