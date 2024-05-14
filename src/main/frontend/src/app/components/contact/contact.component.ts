import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
  <div class="flex flex-wrap lg:justify-between m-auto max-w-screen-xl mt-12">
    <div class="w-full lg:w-1/2 xl:w-6/12 px-4">
      <div class="max-w-[570px] mb-12 lg:mb-0">
        <span class="block mb-4 text-base text-blue-900 font-semibold">Formulario de contacto</span>
        <h2 class="text-blue-900 mb-6 uppercase font-bold text-[32px] sm:text-[40px] lg:text-[36px] xl:text-[40px]">contacta con Nosotros</h2>
        <p class="text-base text-body-color leading-relaxed mb-9">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eius tempor incididunt ut labore et dolore magna aliqua. Ut enim adiqua minim veniam quis nostrud exercitation ullamco
        </p>
      </div>
    </div>
    <div class="w-full lg:w-1/2 xl:w-5/12 px-4">
      <div class="bg-blue-100 relative rounded-xl p-8 sm:p-12 shadow-lg">
        <form>
          <div class="mb-6">
              <input type="text" placeholder="Tu nombre" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary" />
          </div>
          <div class="mb-6">
              <input type="email" placeholder="Tu correo electrónico" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary" />
          </div>
          <div class="mb-6">
              <input type="text" placeholder="Tu número de teléfono" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary" />
          </div>
          <div class="mb-6">
              <textarea rows="6" placeholder="Tu mensaje" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary"></textarea>
          </div>
          <div>
              <button type="submit" class="w-full text-white bg-blue-700 rounded border border-primary p-3 transition hover:bg-opacity-90">Envía tu mensaje</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
