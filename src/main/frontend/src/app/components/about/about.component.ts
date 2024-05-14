import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: `
  <div class="py-16 bg-white">  
    <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
        <div class="md:5/12 lg:w-5/12">
          <img src="https://texashistory.unt.edu/ark:/67531/metadc1942522/m1/1/med_res/" alt="image" loading="lazy" class="h-5/6">
        </div>
        <div class="md:7/12 lg:w-6/12 m-auto">
          <h2 class="text-2xl text-gray-900 font-bold md:text-4xl">Te contaremos más sobre nosotros en esta sección de la página</h2>
          <p class="mt-6 text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum omnis voluptatem accusantium nemo perspiciatis delectus atque autem! Voluptatum tenetur beatae unde aperiam, repellat expedita consequatur! Officiis id consequatur atque doloremque!</p>
          <p class="mt-4 text-gray-600"> Nobis minus voluptatibus pariatur dignissimos libero quaerat iure expedita at? Asperiores nemo possimus nesciunt dicta veniam aspernatur quam mollitia.</p>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
