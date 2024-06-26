import { Component } from '@angular/core';
import Swal from 'sweetalert2';

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
          En el formulario de contacto de nuestra escuela de música, puedes ponerte en contacto con nosotros fácilmente. Ya sea para consultas,
          inscripciones o cualquier otra pregunta, estamos aquí para ayudarte.<br>¡Esperamos saber de ti pronto!
        </p>
        <img src="../../../assets/images/help.jpg" alt="image" loading="lazy" class="w-11/12">
      </div>
    </div>
    <div class="w-full lg:w-1/2 xl:w-5/12 px-4">
      <div class="bg-blue-100 relative rounded-xl p-8 sm:p-12 shadow-lg">
        <form>
          <div class="mb-6">
              <input type="text" placeholder="Tu nombre" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
              #nombre/>
          </div>
          <div class="mb-6">
              <input type="email" placeholder="Tu correo electrónico" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
              #correo/>
          </div>
          <div class="mb-6">
              <input type="text" placeholder="Tu número de teléfono (opcional)" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
              #numTel/>
          </div>
          <div class="mb-6">
              <textarea rows="6" placeholder="Tu mensaje" class="w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] resize-none outline-none focus-visible:shadow-none focus:border-primary"
              #mensaje></textarea>
          </div>
          <div>
              <button type="button" (click)="onClick(nombre.value, correo.value, mensaje.value)" class="w-full text-white bg-blue-700 rounded border border-primary p-3 transition hover:bg-opacity-90">Envía tu mensaje</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  `,
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  validation(nombre: string, correo: string, mensaje: string): string {

    let message = "";
    if (nombre === '' && correo === '' && mensaje === '') {
      message = "Nombre, correo y mensaje son obligatorios.";
    } else {
      if (nombre === '') {
        message = message + "El nombre es obligatorio. ";
      }
      if (correo === '') {
        message = message + "El correo es obligatorio. ";
      }
      if (mensaje === '') {
        message = message + "El mensaje es obligatorio. ";
      }
    }
    return message;
  }

  onClick(nombre: string, correo: string, mensaje: string) {

    let message = this.validation(nombre, correo, mensaje);

    if (message === "") {
      Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Tendrá una respuesta en menos de 24 horas laborables.",
        showConfirmButton: false,
        timer: 3200,
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Error: campos vacíos',
        text: this.validation(nombre, correo, mensaje),
      })
    }
  }
}
