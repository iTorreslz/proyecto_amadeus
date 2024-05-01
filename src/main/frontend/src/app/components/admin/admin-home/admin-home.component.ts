import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [],
  template: `
  <div class="flex flex-col flex-wrap justify-between fixed top-24 bottom-0 w-48 bg-blue-900 text-white transition-all duration-300 z-10 sidebar">
        <ul class="py-4 space-y-1">
            <li>
                <a href="#" class="flex items-center justify-center h-11 hover:bg-blue-800 text-white mb-2">
                    <i class="fa-solid fa-house"></i>
                    <p class="ml-2 truncate">Home</p>
                </a>
                <a href="#" class="flex items-center justify-center h-11 hover:bg-blue-800 text-white mb-2">
                    <i class="fa-solid fa-graduation-cap"></i>
                    <p class="ml-2 truncate">Alumnado</p>
                </a>
                <a href="#" class="flex items-center justify-center h-11 hover:bg-blue-800 text-white mb-2">
                    <i class="fa-solid fa-chalkboard-user"></i>
                    <p class="ml-2 truncate">Profesorado</p>
                </a>
                <a href="#" class="flex items-center justify-center h-11 hover:bg-blue-800 text-white mb-2">
                    <i class="fa-solid fa-guitar"></i>
                    <p class="ml-2 truncate">Audiciones</p>
                </a>
                <a href="#" class="flex items-center justify-center h-11 hover:bg-blue-800 text-white">
                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                    <p class="ml-2 truncate">Admisiones</p>
                </a>
            </li>
        </ul>
        <p class="mb-14 px-5 py-3 text-center text-xs">Iván Torres López | 2024</p>
    </div>
  `,
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
