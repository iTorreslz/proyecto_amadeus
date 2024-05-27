import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AlumnadoListaComponent } from './components/admin/alumnado/alumnado-lista/alumnado-lista.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { ProfesoradoListaComponent } from './components/admin/profesorado/profesorado-lista/profesorado-lista.component';
import { AudicionesListaComponent } from './components/admin/audiciones/audiciones-lista/audiciones-lista.component';
import { AdmisionesListaComponent } from './components/admin/admisiones/admisiones-lista/admisiones-lista.component';
import { AlumnadoDetalleComponent } from './components/admin/alumnado/alumnado-detalle/alumnado-detalle.component';
import { InformacionComponent } from './components/informacion/informacion.component';
import { ContactComponent } from './components/contact/contact.component';
import { EventsComponent } from './components/events/events.component';
import { AboutComponent } from './components/about/about.component';
import { AlumnadoEditarComponent } from './components/admin/alumnado/alumnado-editar/alumnado-editar.component';
import { ProfesoradoDetalleComponent } from './components/admin/profesorado/profesorado-detalle/profesorado-detalle.component';
import { ProfesoradoEditarComponent } from './components/admin/profesorado/profesorado-editar/profesorado-editar.component';
import { ProfesoradoCrearComponent } from './components/admin/profesorado/profesorado-crear/profesorado-crear.component';
import { AudicionesCrearComponent } from './components/admin/audiciones/audiciones-crear/audiciones-crear.component';
import { AdmisionesCrearComponent } from './components/users/alumnos/admisiones-crear/admisiones-crear.component';
import { PerfilAlumnoComponent } from './components/users/alumnos/perfil-alumno/perfil-alumno.component';
import { PerfilProfesorComponent } from './components/users/profesores/perfil-profesor/perfil-profesor.component';
import { AlumnadoAsignarClaseComponent } from './components/admin/alumnado/alumnado-asignar-clase/alumnado-asignar-clase.component';
import { VerTareasComponent } from './components/users/profesores/ver-tareas/ver-tareas.component';
import { CrearTareasComponent } from './components/users/profesores/crear-tareas/crear-tareas.component';
import { EditarTareasComponent } from './components/users/profesores/editar-tareas/editar-tareas.component';
import { InstrumentosComponent } from './components/instrumentos/instrumentos.component';

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
        path: 'instrumentos',
        component: InstrumentosComponent,
        title: 'Guía de instrumentos'
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
        path: 'perfil_alumno',
        component: PerfilAlumnoComponent,
        title: 'Perfil Alumno'
    },
    {
        path: 'admisiones/nuevo',
        component: AdmisionesCrearComponent,
        title: 'Nueva Admisión'
    },
    {
        path: 'perfil_profesor',
        component: PerfilProfesorComponent,
        title: 'Perfil Profesor'
    },
    {
        path: 'nueva-tarea/:idProfesor',
        component: CrearTareasComponent,
        title: 'Nueva tarea'
    },
    {
        path: 'tareas-alum/:idAlumno/prof/:idProfesor',
        component: VerTareasComponent,
        title: 'Tareas alumno'
    },
    {
        path: 'tareas-alum/:idAlumno/prof/:idProfesor/editar/:id',
        component: EditarTareasComponent,
        title: 'Editar tarea'
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
                title: 'Detalle alumno'
            },
            {
                path: 'alumnado/editar/:id',
                component: AlumnadoEditarComponent,
                title: 'Editar alumno'
            },
            {
                path: 'alumnado/asignar_clase/:id',
                component: AlumnadoAsignarClaseComponent,
                title: 'Asignar clase'
            },
            {
                path: 'profesorado',
                component: ProfesoradoListaComponent,
                title: 'Administración Profesorado'
            },
            {
                path: 'profesorado/nuevo',
                component: ProfesoradoCrearComponent,
                title: 'Nuevo Profesor'
            },
            {
                path: 'profesorado/detalle/:id',
                component: ProfesoradoDetalleComponent,
                title: 'Detalle profesor'
            },
            {
                path: 'profesorado/editar/:id',
                component: ProfesoradoEditarComponent,
                title: 'Editar profesor'
            },
            {
                path: 'audiciones',
                component: AudicionesListaComponent,
                title: 'Administración Audiciones'
            },
            {
                path: 'audiciones/nuevo',
                component: AudicionesCrearComponent,
                title: 'Nueva Audición'
            },
            {
                path: 'admisiones',
                component: AdmisionesListaComponent,
                title: 'Administración Admisiones'
            }
        ]
    },

];
