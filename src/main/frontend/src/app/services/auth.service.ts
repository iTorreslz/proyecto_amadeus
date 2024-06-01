import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/LoginResponse';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedIn$: Observable<boolean> = this.loggedInBS.asObservable();

  private tipoUsuarioBS: BehaviorSubject<string> = new BehaviorSubject<string>('');
  tipoUsuario$: Observable<string> = this.tipoUsuarioBS.asObservable();


  constructor(private http: HttpClient, private router: Router) { }

  //-------------------- BEHAVIOR SUBJECT --------------------//
  setLoggedIn(loggedIn: boolean) {
    this.loggedInBS.next(loggedIn);
  }

  setTipoUsuario(tipoUsuario: string) {
    this.tipoUsuarioBS.next(tipoUsuario);
  }

  //-------------------- LOGIN --------------------//

  login(email: string, password: string) {
    const body = {
      email: email,
      password: password
    };

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
      withCredentials: true
    };

    this.http.post<LoginResponse>('http://localhost:8082/auth/login', body, options).subscribe({
      next: (response: LoginResponse) => {
        if (response.mensaje === 'Inicio de sesión exitoso.') {
          let tipoUsuario: string = "";

          switch (response.tipoUsuario) {
            case "1":
              tipoUsuario = "alumno";
              break;
            case "2":
              tipoUsuario = "profesor";
              break;
            case "3":
              tipoUsuario = "admin";
              break;
            default:
              console.log("Error al iniciar sesión.")
              break;
          }

          localStorage.setItem('tipoUsuario', tipoUsuario);
          localStorage.setItem('usuario', JSON.stringify(response.usuario));
          this.setLoggedIn(true);
          this.setTipoUsuario(tipoUsuario);

        } else {
          Swal.fire({
            title: "Incorrecto",
            text: "Credenciales inválidas.",
            icon: "warning"
          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  //-------------------- LOGOUT --------------------//

  logout() {
    this.http.get<{ respuesta: string }>('http://localhost:8082/auth/logout').subscribe({
      next: (response) => {
        if (response.respuesta === 'Logout exitoso.') {
          localStorage.removeItem('usuario');
          localStorage.removeItem('tipoUsuario');
          this.setLoggedIn(false);
          this.setTipoUsuario('');
          Swal.fire({
            title: "Cerrando...",
            text: "¡Has cerrado sesión correctamente!",
            icon: "success",
            showConfirmButton: false,
            timer: 1600,
          });
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  //-------------------- REGISTRO --------------------//

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
            this.login(email, password);
            Swal.fire({
              title: "Correcto",
              text: "¡Tu cuenta ha sido creada! Sesión iniciada.",
              showConfirmButton: false,
              timer: 1600,
              icon: "success"
            });
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

  //-------------------- CHECK LOGGEDIN --------------------//
  checkLoggedIn(): boolean {
    return localStorage.getItem('usuario') !== null;
  }
}
