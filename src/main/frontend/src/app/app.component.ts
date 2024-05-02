import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
  <main>
        <nav class="border-b border-gray-300">
            <div class="max-w-7xl m-auto flex flex-row items-center justify-between">
                <a [routerLink]="['/']">
                    <img src="/assets/images/logo.jpg" class="h-24">
                </a>
                <div class="flex items-center">
                    <div class="text-blue-800 text-lg font-semibold pr-4 flex flex-row">
                        <a [routerLink]="['/']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          Inicio
                        </a>
                        <a [routerLink]="['/']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          Información
                        </a>
                        <a [routerLink]="['/']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          ¡Hazte alumno!
                        </a>
                        <a [routerLink]="['/']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          Contacto
                        </a>
                        <a [routerLink]="['/']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          Sobre nosotros
                        </a>
                    </div>

                    <div style="display: none;" class="text-blue-800 text-lg font-semibold pr-4 border-black flex flex-row items-center border-l">
                        <a [routerLink]="['/']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                          Registrarse
                        </a>
                        <a [routerLink]="['/']" class="hover:bg-blue-400 p-2 rounded-xl">
                          Iniciar sesión
                        </a>
                    </div>

                    <div style="display: none;" class="text-blue-800 text-lg font-semibold pr-4 border-black flex flex-row items-center border-l">
                        <a [routerLink]="['/']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                          Mi usuario
                        </a>
                        <a [routerLink]="['/']" class="hover:bg-blue-400 p-2 rounded-xl">
                          Cerrar sesión
                        </a>
                    </div>

                    <div class="text-blue-800 text-lg font-semibold pr-4 border-black flex flex-row items-center border-l">
                        <a [routerLink]="['/admin']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                          Administrar
                        </a>
                        <a [routerLink]="['/']" class="hover:bg-blue-400 p-2 rounded-xl">
                          Cerrar sesión
                        </a>
                    </div>
                </div>
            </div>
        </nav>
        <div class="content">
          <router-outlet></router-outlet>
        </div>
    </main>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amadeus';
}