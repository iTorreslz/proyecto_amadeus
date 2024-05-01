import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Amadeus'
    },
    {
        path: 'admin',
        component: AdminHomeComponent,
        title: 'Administración'
    },
];
