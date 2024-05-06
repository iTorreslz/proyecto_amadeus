import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  template: `
  <div class="max-w-7xl m-auto mt-10">
    <form class="flex flex-col items-center m-auto w-3/6">
      <input class="w-60 p-2 border border-black rounded mb-2" type="email" placeholder="Email" #email>
      <input class="w-60 p-2 border border-black rounded mb-2" type="password" placeholder="Password" #password>
      <input class="w-60 p-2 border border-black rounded mb-2" type="text" placeholder="Nombre" #nombre>
      <input class="w-60 p-2 border border-black rounded mb-2" type="text" placeholder="Apellidos" #apellidos>
      <button class="w-32 p-2 border border-black rounded bg-blue-300" type="button" (click)="register(email.value,password.value,nombre.value,apellidos.value)">Login</button>
    </form>
  </div>
  `,
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private http: HttpClient) { }

  register(email: string, password: string, nombre: string, apellidos: string) {
    const body = {
      email: email,
      password: password,
      nombre: nombre,
      apellidos: apellidos,
      curso: 1
    };

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };

    this.http.post<any>('http://localhost:8082/auth/register', body, options).subscribe(
      response => {
        switch (response.respuesta) {
          case 'Registro exitoso':
            alert('Registro exitoso');
            break;
          case 'Credenciales inválidas':
            alert('Credenciales inválidas');
            break;
          default:
            alert('Ocurrió un error');
            break;
        }
      }
    );
  }
}
