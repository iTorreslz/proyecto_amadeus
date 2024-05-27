import { Component } from '@angular/core';

@Component({
  selector: 'app-instrumentos',
  standalone: true,
  imports: [],
  template: `
  <div class="bg-blue-200 py-20">
    <div class="max-w-screen-lg mx-auto flex justify-between items-center">
      <div class="max-w-xl">
          <h2 class="font-black text-sky-950 text-3xl mb-4">Te presentamos en esta sección una guía de instrumentos.</h2>
          <p class="text-base text-sky-950">Vamos a mostrarte toda nuestra oferta de clases, que son los instrumentos que enseñamos, y una descripción de cada uno, para que puedas decidir cuál escoger. ¡Es una importante decisión!</p>
      </div>
      <div class="h-full mt-auto overflow-hidden relative">
        <img src="https://cdn.shopify.com/s/files/1/0253/8618/8834/files/instrumentos-musicales-para-colorear.jpg?1169" class="h-36 w-full object-contain rounded" alt="">
      </div>
    </div>
  </div>

  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-center pr-16">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">PIANO</h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/piano.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">
                Versatilidad y Elegancia Musical
              </h2>
              <p class="text-white text-sm">
                El piano es un instrumento de teclado que produce sonido mediante la percusión de cuerdas internas con martillos. Ideal para estudiantes
                de todos los niveles, nuestro piano ofrece una experiencia musical enriquecedora y versátil, permitiendo explorar desde melodías clásicas
                hasta composiciones contemporáneas. Su presencia en la escuela fomenta el desarrollo del oído musical y la técnica pianística.
              </p>
              <a href="" target="_blank" class="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10" style="text-decoration: none; display: inline-block;">
                ¡Escucha con tranquilidad!
              </a>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Ritmo y Armonía en Cada Cuerda
              </h2>
              <p class="text-sky-950 text-sm">
                La guitarra clásica es un instrumento de cuerdas pulsadas que destaca por su versatilidad y sonido cálido. Perfecta para principiantes y avanzados,
                permite interpretar una amplia gama de estilos, desde música clásica hasta piezas populares. Su inclusión en nuestra escuela enriquece la formación
                musical, desarrollando tanto la técnica como la creatividad de los estudiantes.
              </p>
              <a href="URL_DEL_VIDEO_DE_YOUTUBE" target="_blank" class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10" style="text-decoration: none; display: inline-block;">
                ¡Escucha con tranquilidad!
              </a>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16 items-center">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">GUITARRA CLÁSICA
          </h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/clasica.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>

  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-center pr-16">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">Clarinete</h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/clarinete.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">Procesamos tu solicitud <br>y te damos una rápida respuesta
              </h2>
              <p class="text-white text-sm">
                  Purus in massa tempor nec. Magna etiam tempor orci eu lobortis elementum nibh tellus molestie.
                  Faucibus ornare suspendisse sed nisi lacus sed viverra. Diam in arcu cursus euismod quis viverra
                  nibh cras pulvinar.
              </p>
              <button
                  class="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">¡Escucha con tranquilidad!</button>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Expresividad y Energía Musical
              </h2>
              <p class="text-sky-950 text-sm">
                El saxofón es un instrumento de viento-madera conocido por su tono rico y potente. Ideal para solistas y conjuntos, su versatilidad abarca géneros
                como el jazz, el clásico y el pop. En nuestra escuela, el saxofón ayuda a los estudiantes a desarrollar habilidades de respiración, control de
                embocadura y expresión musical, ofreciendo una experiencia educativa dinámica y completa.
              </p>
              <a href="URL_DEL_VIDEO_DE_YOUTUBE" target="_blank" class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10" style="text-decoration: none; display: inline-block;">
                ¡Escucha con tranquilidad!
              </a>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16 items-center">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">SAXOFÓN
          </h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/saxofon.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>

  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-center pr-16">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">FLAUTA</h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/flauta.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">Ligereza y Dulzura en Cada Nota
              </h2>
              <p class="text-white text-sm">
                La flauta es un instrumento de viento que produce sonidos melodiosos y claros a través de la vibración del aire en su tubo. Perfecta para
                principiantes y músicos avanzados, su versatilidad permite interpretar desde música clásica hasta contemporánea. En nuestra escuela, la flauta
                ayuda a los estudiantes a mejorar su técnica de respiración, coordinación y oído musical.
              </p>
              <button
                  class="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">¡Escucha con tranquilidad!</button>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Brillantez y Potencia Sonora
              </h2>
              <p class="text-sky-950 text-sm">
                La trompeta es un instrumento de viento-metal caracterizado por su sonido brillante y potente. Ideal para solistas y miembros de bandas, su versatilidad
                permite abordar diversos géneros, desde la música clásica hasta el jazz. En nuestra escuela, la trompeta ayuda a los estudiantes a desarrollar técnicas
                de embocadura, respiración y control del sonido, enriqueciendo su formación musical integral.
              </p>
              <a href="URL_DEL_VIDEO_DE_YOUTUBE" target="_blank" class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10" style="text-decoration: none; display: inline-block;">
                ¡Escucha con tranquilidad!
              </a>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16 items-center">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">TROMPETA
          </h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/trompeta.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>

  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-center pr-16">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">BOMBARDINO</h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/bombardino.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">Profundidad y Suavidad
              </h2>
              <p class="text-white text-sm">
                El bombardino es un instrumento de viento-metal que destaca por su tono cálido y profundo. Ideal para interpretar tanto melodías como acompañamientos,
                su versatilidad abarca géneros desde la música clásica hasta las bandas de concierto. En nuestra escuela, el bombardino ayuda a los estudiantes a
                desarrollar técnicas de respiración, embocadura y control del sonido, proporcionando una base sólida para su formación musical.
              </p>
              <button
                  class="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">¡Escucha con tranquilidad!</button>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Fundamento y Riqueza en el Registro Grave
              </h2>
              <p class="text-sky-950 text-sm">
                La tuba es el instrumento de viento-metal más grande y grave, conocido por su sonido profundo y resonante. Fundamental en orquestas y bandas, su
                versatilidad abarca desde música clásica hasta contemporánea. En nuestra escuela, la tuba permite a los estudiantes desarrollar técnicas avanzadas
                de respiración y embocadura, proporcionando una base sólida y rica para cualquier conjunto musical.
              </p>
              <a href="URL_DEL_VIDEO_DE_YOUTUBE" target="_blank" class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10" style="text-decoration: none; display: inline-block;">
                ¡Escucha con tranquilidad!
              </a>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16 items-center">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">TUBA
          </h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/tuba.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>

  <div class="py-12 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div class="w-full flex flex-col items-center pr-16">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">TROMBÓN</h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/trombon.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>

      <div
          class="py-20 bg-slate-100 relative before:absolute before:h-full before:w-screen before:bg-sky-950 before:top-0 before:left-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-white font-black text-5xl leading-snug mb-10">Flexibilidad y Poderío Sonoro
              </h2>
              <p class="text-white text-sm">
                El trombón es un instrumento de viento-metal con una vara deslizante que permite una amplia gama de notas y efectos. Conocido por su tono
                potente y versátil, es ideal para géneros como el jazz, la música clásica y las bandas de concierto. En nuestra escuela, el trombón ayuda a
                los estudiantes a desarrollar técnicas precisas de embocadura, respiración y control del tono, enriqueciendo su formación musical.
              </p>
              <button
                  class="mt-8 text-white uppercase py-3 text-sm px-10 border border-white hover:bg-white hover:bg-opacity-10">¡Escucha con tranquilidad!</button>
          </div>
      </div>
    </div>
  </div>

  <div class="py-4 relative overflow-hidden bg-white">
    <div class="grid grid-cols-2 max-w-screen-lg mx-auto">
      <div
          class="py-20 bg-blue-200 relative before:absolute before:h-full before:w-screen before:bg-blue-200 before:top-0 before:right-0">
          <div class="relative z-20 pl-12">
              <h2 class="text-sky-950 font-black text-5xl leading-snug mb-10">Expresión y Emoción en Cada Nota
              </h2>
              <p class="text-sky-950 text-sm">
                El canto es la expresión musical más íntima, donde la voz humana se convierte en instrumento. En nuestra escuela, el canto no solo desarrolla
                la técnica vocal, sino también la expresividad y la conexión emocional con la música. Los estudiantes exploran diversos estilos y repertorios,
                nutriendo su creatividad y confianza en el escenario.
              </p>
              <a href="URL_DEL_VIDEO_DE_YOUTUBE" target="_blank" class="mt-8 text-sky-950 uppercase py-3 text-sm px-10 border border-sky-950 hover:bg-white hover:bg-opacity-10" style="text-decoration: none; display: inline-block;">
                ¡Escucha con tranquilidad!
              </a>
          </div>
      </div>
      <div class="w-full flex flex-col pl-16 items-center">
          <h2 class="font-bold text-3xl max-w-sm text-center mb-12 mt-10">CANTO
          </h2>
          <div class="h-full mt-auto overflow-hidden relative">
              <img src="../../../assets/images/ofertas/canto.jpg" class="h-full w-full object-contain" alt="">
          </div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './instrumentos.component.css'
})
export class InstrumentosComponent {

}
