import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-admin-home',
    standalone: true,
    imports: [RouterOutlet, RouterLink],
    template: `
    <p>Home Admin</p>
    `,
    styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
