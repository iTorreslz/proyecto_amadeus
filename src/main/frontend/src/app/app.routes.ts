import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AlumnadoListaComponent } from './components/admin/alumnado/alumnado-lista/alumnado-lista.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { ProfesoradoListaComponent } from './components/admin/profesorado/profesorado-lista/profesorado-lista.component';
import { AudicionesListaComponent } from './components/admin/audiciones/audiciones-lista/audiciones-lista.component';
import { AdmisionesListaComponent } from './components/admin/admisiones/admisiones-lista/admisiones-lista.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AlumnadoDetalleComponent } from './components/admin/alumnado/alumnado-detalle/alumnado-detalle.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ContactComponent } from './components/contact/contact.component';
import { EventsComponent } from './components/events/events.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Amadeus'
    },
    {
        path: 'events',
        component: EventsComponent,
        title: 'Próximos eventos'
    },
    {
        path: 'informacion',
        component: InformacionComponent,
        title: 'Información'
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Registro'
    },
    {
        path: 'contacto',
        component: ContactComponent,
        title: 'Contacto'
    },
    {
        path: 'about',
        component: AboutComponent,
        title: 'Sobre nosotros'
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login'
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
                path: 'alumnado/detalle/:id',
                component: AlumnadoDetalleComponent,
                title: 'Detalle del alumno'
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
