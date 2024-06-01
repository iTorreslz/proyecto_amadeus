import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
  <div class="py-16 bg-white">  
    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="flex flex-col md:5/12 lg:w-5/12">
          <img src="../../../assets/images/escuela.jpg" alt="image" loading="lazy" class="rounded h-full mb-24">
          <img src="../../../assets/images/escuela_02.jpg" alt="image" loading="lazy" class="rounded h-full mt-2">
        </div>
        <div class="flex flex-col h-screen items-center text-justify md:7/12 lg:w-6/12 m-auto">
          <img src="../../../assets/images/logo.jpg" alt="image" loading="lazy" class="w-1/4">
          <h2 class="text-4xl text-center text-gray-900 md:text-5xl bg-blue-200 rounded p-6">Escuela de Música <span class="font-bold text-blue-800">Amadeus</span></h2>
          <p class="mt-12 text-gray-600 bg-blue-100 p-2 rounded">
            La Escuela de Música <span class="font-bold text-blue-800">Amadeus</span>, fundada hace diez años por el famoso director Iván Torres,
            se ha consolidado como una de las instituciones musicales más prestigiosas de España. Situada en el corazón de Málaga,
            esta escuela comenzó su andadura con solo tres instrumentos: piano, guitarra y canto. La pasión y dedicación de Iván Torres,
            junto con un enfoque único en la libertad musical, sentaron las bases para su éxito y crecimiento constante.
          </p>
          <p class="mt-2 text-gray-600 bg-blue-100 p-2 rounded">
            Desde sus humildes comienzos, la escuela ha experimentado una transformación impresionante. Con un enfoque en ofrecer una educación
            musical integral y personalizada, Iván Torres y su equipo de talentosos profesores han ampliado el repertorio de instrumentos y
            disciplinas enseñadas. Hoy en día, la Escuela de Música <span class="font-bold text-blue-800">Amadeus</span> ofrece clases en una
            amplia variedad de instrumentos.
          </p>
          <p class="mt-2 text-gray-600 bg-blue-100 p-2 rounded">
            La filosofía de la escuela siempre ha sido poner la libertad musical por delante, permitiendo a los estudiantes explorar y
            desarrollar su propio estilo y creatividad. Esta visión ha permitido que numerosos estudiantes se conviertan en grandes artistas,
            algunos de los cuales han ganado reconocimiento a nivel nacional e internacional. La escuela se enorgullece de haber sido el
            trampolín para estas carreras exitosas, proporcionando una plataforma donde los talentos emergentes pueden florecer.
          </p>
          <p class="mt-2 text-gray-600 bg-blue-100 p-2 rounded">
            A lo largo de los años, la Escuela de Música <span class="font-bold text-blue-800">Amadeus</span> ha organizado numerosos
            conciertos, talleres y eventos, fortaleciendo su posición como un epicentro cultural en la ciudad. Bajo la dirección de Iván
            Torres, la escuela no solo ha impartido conocimiento musical, sino que también ha cultivado una comunidad vibrante y apasionada
            por la música.
          </p>
          <p class="mt-2 text-gray-600 bg-blue-100 p-2 rounded">
            La Escuela de Música <span class="font-bold text-blue-800">Amadeus</span> sigue innovando y evolucionando, manteniéndose fiel
            a su misión de promover la libertad musical y el desarrollo artístico. Con una década de éxitos a sus espaldas, la escuela está
            preparada para seguir siendo un faro de excelencia musical en España durante muchos años más.
          </p>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
