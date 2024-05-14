import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

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
                          <button (click)="logout()" class="hover:bg-blue-400 p-2 rounded-xl">
                            Cerrar sesión
                          </button>
                        </div>
                      </div>
                      <ng-template #loggedInNav>
                        <div class="text-blue-800 text-lg font-semibold pr-4 border-black flex flex-row items-center border-l">
                          <a [routerLink]="['/']" class="text-white ml-10 mr-3 bg-blue-800 p-2 rounded-xl">
                            Mi usuario
                          </a>
                          <button (click)="logout()" class="hover:bg-blue-400 p-2 rounded-xl">
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

  constructor(private http: HttpClient) { }

  loggedIn: boolean = false;

  ngOnInit() {
    this.isLoggedIn();
  }

  title = 'amadeus';

  isLoggedIn() {
    this.http.get<boolean>('http://localhost:8082/auth/logueado').subscribe(
      (response) => {
        this.loggedIn = response;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  logout() {
    this.http.get<string>('http://localhost:8082/auth/logout').subscribe(
      (response) => {
        alert(response);
        if (response.includes('Logout exitoso')) {
          this.loggedIn = false;
        }
      },
      (error) => {
        console.error('Error al cerrar la sesión:', error);
      }
    );
  }

  isAdmin() {
    return false;
    this.http.get<boolean>('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').subscribe(
      (response) => {
        this.loggedIn = response;
      },
      (error) => {
        console.error('Error al verificar si el usuario es administrador:', error);
      }
    );
  }
}
