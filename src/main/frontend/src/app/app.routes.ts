import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AlumnadoListaComponent } from './components/admin/alumnado/alumnado-lista/alumnado-lista.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { ProfesoradoListaComponent } from './components/admin/profesorado/profesorado-lista/profesorado-lista.component';
import { AudicionesListaComponent } from './components/admin/audiciones/audiciones-lista/audiciones-lista.component';
import { AdmisionesListaComponent } from './components/admin/admisiones/admisiones-lista/admisiones-lista.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Amadeus'
    },
    {
        path: 'admin',
        component: AdminMainComponent,
        title: 'Administración',
        children: [
            {
                path: '',
                component: AdminHomeComponent,
                title: 'Administración'
            },
            {
                path: 'alumnado',
                component: AlumnadoListaComponent,
                title: 'Administración Alumnado'
            },
            {
                path: 'profesorado',
                component: ProfesoradoListaComponent,
                title: 'Administración Profesorado'
            },
            {
                path: 'audiciones',
                component: AudicionesListaComponent,
                title: 'Administración Audiciones'
            },
            {
                path: 'admisiones',
                component: AdmisionesListaComponent,
                title: 'Administración Admisiones'
            }
        ]
    },
];
