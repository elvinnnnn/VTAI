import { Component } from '@angular/core'
import { NavbarComponent } from '../../navbar/navbar.component';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    standalone: true,
    imports: [ NavbarComponent ]
})
export class PlayerComponent {}