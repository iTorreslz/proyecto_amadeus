import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule],
  template: `
  <div class="max-w-7xl m-auto mt-10">
    <form class="flex flex-col items-center m-auto w-3/6">
      <input class="w-60 p-2 border border-black rounded mb-2" type="email" placeholder="Email" #email>
      <input class="w-60 p-2 border border-black rounded mb-2" type="password" placeholder="Password" #password>
      <button class="w-32 p-2 border border-black rounded bg-blue-300" type="button" (click)="login(email.value,password.value)">Login</button>
    </form>
  </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    this.http.post<any>('http://localhost:8082/auth/login', body.toString(), options).subscribe(
      response => {
        switch (response.respuesta) {
          case 'Login exitoso':
            alert('Login exitoso');
            this.router.navigate(['/']);
            break;
          case 'Credenciales inválidas':
            alert('Credenciales inválidas');
            break;
          case 'No existe alumno':
            alert('No existe alumno');
            break;
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}
