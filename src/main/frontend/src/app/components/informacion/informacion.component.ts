import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../auth/login/login.component';

@Component({
    selector: 'app-informacion',
    standalone: true,
    imports: [RouterLink],
    template: `
  <div class="bg-blue-200 py-20">
    <div class="max-w-screen-lg mx-auto flex justify-between items-center">
      <div class="max-w-xl">
          <h2 class="font-black text-sky-950 text-3xl mb-4">Si deseas comenzar ahora, te guiamos paso a paso</h2>
          <p class="text-lg text-sky-950">A continuación te explicaremos el procedimiento natural para unirte a la escuela.</p>
      </div>
      <div class="h-full mt-auto overflow-hidden relative mb-10">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi5C17jT0Gyy8qRW9TtQIcEKOvEh3XdkLAL3g0pkHYaA&s" class="h-32 w-full object-contain rounded" alt="">
          </div>
    </div>
  </div>

  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-center pr-16">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">Primer paso: regístrate o inicia sesión</h2>
          <div class="h-full mt-auto overflow-hidden relative mb-10">
              <img src="../../../assets/images/info_01.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">Te registramos y te identificamos de <br>forma sencilla
              </h2>
              <p class="text-white text-lg">
                Puedes iniciar sesión para acceder a tu cuenta y disfrutar de todos los servicios de nuestra escuela de música, como clases
                individuales o audiciones. Si aún no tienes una cuenta, no te preocupes. Pulsa el botón de abajo
                para registrarte de forma rápida y sencilla.
              </p>
              <button (click)="openLogin()"
                  class="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">Click
                  aquí</button>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12 mr-6">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Puedes ver aquí <br>la amplia gama de instrumentos
              </h2>
              <p class="text-sky-950 text-lg">
                Encuentra el instrumento perfecto para ti. Explora nuestra variada selección y elige entre una amplia gama de instrumentos
                musicales. Si aún no sabes cuál es el adecuado, no te preocupes. Pulsa el botón de abajo para ver más detalles y obtener toda
                la información necesaria.
              </p>
              <button [routerLink]="['/instrumentos']"
                  class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10">Click
                  aquí</button>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16 items-center">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">Segundo paso: escoge instrumento
          </h2>
          <div class="h-full mt-auto overflow-hidden relative mb-10">
              <img src="../../../assets/images/info_02.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>

  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-center pr-16">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">Tercer paso: Espera la confirmación del centro</h2>
          <div class="h-full mt-auto overflow-hidden relative mb-10">
              <img src="../../../assets/images/info_03.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">Procesamos tu solicitud <br>y te damos una rápida respuesta
              </h2>
              <p class="text-white text-lg">
                Envía tu solicitud y obtén una respuesta en poco tiempo. Nuestro equipo está listo para atenderte de manera eficiente.<br>Si
                aún no has enviado tu solicitud, no te preocupes. Solo tienes que iniciar sesión y acceder a tu perfil. Ahí podrás solicitarlo
                fácilmente.
              </p>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12 mr-6">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Si has sido aceptado, <br>¡está todo listo!
              </h2>
              <p class="text-sky-950 text-lg">
                Enhorabuena si has sido aceptado. Ahora puedes empezar a disfrutar de todas las actividades y servicios que ofrecemos.<br>Revisa tu
                horario para conocer tus próximas clases y eventos. Si aún no has comprobado tu horario, podrás hacerlo desde tu perfil personal, en la
                esquina superior derecha.
              </p>
              <button *ngIf="checkLogin(); else notLogged" [routerLink]="['/perfil_alumno']"
                  class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10">Click
                  aquí
              </button>
              <ng-template #notLogged>
                <button class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10">Click
                    aquí
                </button>
              </ng-template>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16 items-center">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">Cuarto paso: ¡Diviértete! Comprueba tu horario
          </h2>
          <div class="h-full mt-auto overflow-hidden relative mb-10">
              <img src="../../../assets/images/info_04.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>
  `,
    styleUrl: './informacion.component.css'
})
export class InformacionComponent {
    constructor(
        private dialog: MatDialog
    ) { }

    openLogin() {
        this.dialog.open(LoginComponent, {
            width: 'fit-content',
            height: 'fit-content'
        });
    }

    checkLogin() {
        return localStorage.getItem('usuario') != null;
    }
}
