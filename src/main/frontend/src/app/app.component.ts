import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule],
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
                        <a [routerLink]="['/events']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          Próximos eventos
                        </a>
                        <a [routerLink]="['/informacion']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          ¡Hazte alumno!
                        </a>
                        <a [routerLink]="['/contacto']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          Contacto
                        </a>
                        <a [routerLink]="['/about']" class="mr-3 hover:bg-blue-400 p-2 rounded-xl">
                          Sobre nosotros
                        </a>
                        
                    </div>

                    <div *ngIf="loggedIn">
                      <div *ngIf="isAdmin(); else loggedInNav">
                        <div class="text-blue-800 text-lg font-semibold pr-4 border-black flex flex-row items-center border-l">
                          <a [routerLink]="['/admin']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                            Administrar
                          </a>
                          <button (click)="this.logout()" class="hover:bg-blue-400 p-2 rounded-xl">
                            Cerrar sesión
                          </button>
                        </div>
                      </div>
                      <ng-template #loggedInNav>
                        <div class="text-blue-800 text-lg font-semibold pr-4 border-black flex flex-row items-center border-l">
                          <a *ngIf="tipoUsuario.includes('alumno')" [routerLink]="['/perfil_alumno']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                            Mi usuario
                          </a>
                          <a *ngIf="tipoUsuario.includes('profesor')" [routerLink]="['/perfil_profesor']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                            Mi usuario
                          </a>
                          <button (click)="this.logout()" class="hover:bg-blue-400 p-2 rounded-xl">
                            Cerrar sesión
                          </button>
                        </div>
                      </ng-template>
                    </div>
                    <div *ngIf="!loggedIn">
                      <div class="text-blue-800 text-lg font-semibold pr-4 border-black flex flex-row items-center border-l">
                        <a [routerLink]="['/register']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                          Registrarse
                        </a>
                        <a [routerLink]="['/login']" class="hover:bg-blue-400 p-2 rounded-xl">
                          Iniciar sesión
                        </a>
                      </div>
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
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) { }

  tipoUsuario: string = "";
  loggedIn: boolean = false;

  ngOnInit() {
    this.authService.loggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });

    this.authService.tipoUsuario$.subscribe(tipoUsuario => {
      this.tipoUsuario = tipoUsuario;
    });

    if (this.loggedIn === false && localStorage.getItem('usuario')) {
      this.loggedIn = true;
      const storageTipoUsuario = localStorage.getItem('tipoUsuario');
      this.tipoUsuario = storageTipoUsuario !== null ? storageTipoUsuario : 'alumno';
    }
  }

  isAdmin() {
    if (this.tipoUsuario == "admin") {
      return true;
    } else {
      return false
    }
  }

  logout() {
    this.authService.logout();
  }
}
