import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: `
  <div
    class="h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
    <img src="https://www.academiasolfeando.com/wp-content/uploads/2023/02/escuela-de-musica.jpg.webp" class="absolute top-0 left-0 w-full min-h-full ob" alt="">
    <div class="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
      <div class="col-span-6">
        <span class="uppercase text-white text-xs font-bold mb-2 block">BIENVENIDO</span>
        <h1 class="text-white font-extrabold text-5xl mb-8">En la Escuela de Música Amadeus, la música se vive y
            se siente con libertad</h1>
        <p class="text-stone-100 text-base">
            Nos proponemos brindarte todo nuestro conocimiento, y que te conviertas en un gran profesional de la
            música en un entorno sin presiones,
            donde el único objetivo es disfrutar y aprender a tu propio ritmo.
        </p>
        <button [routerLink]="['/informacion']"
            class="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-white hover:bg-opacity-10">Comenzar
            ahora</button>
      </div>
    </div>
  </div>
  <div class="bg-blue-200 py-20">
    <div class="max-w-screen-lg mx-auto flex justify-between items-center">
      <div class="max-w-xl">
          <h2 class="font-black text-sky-950 text-3xl mb-4">¿No sabes qué instrumento va mejor contigo? Descubre
              tu instrumento ideal en nuestra sección de ayuda.</h2>
          <p class="text-base text-sky-950">En esta sección te brindaremos una amplia descripción de cada
              instrumento, te mostraremos su sonido y lo que serías capaz de lograr.</p>
      </div>
      <button
          class="text-sky-950 uppercase py-3 text-base px-10 border border-sky-950 hover:bg-sky-950 hover:bg-opacity-10">Te guiamos aquí</button>
    </div>
  </div>
  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-end pr-16">
          <h2 class="font-bold text-2xl max-w-xs text-right mb-12 mt-10">Noticia nº1</h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="https://texashistory.unt.edu/ark:/67531/metadc1942522/m1/1/med_res/" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">Contenido <br>de la noticia
              </h2>
              <p class="text-white text-sm">
                  Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie.
                  Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra
                  nibh cras pulvinar.
              </p>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Contenido <br>de la noticia
              </h2>
              <p class="text-sky-950 text-sm">
                  Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie.
                  Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra
                  nibh cras pulvinar.
              </p>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16">
          <h2 class="text-[#64618C] font-bold text-2xl max-w-xs text-left mb-12 mt-10">Noticia nº2
          </h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="https://texashistory.unt.edu/ark:/67531/metadc1942522/m1/1/med_res/" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
