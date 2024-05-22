import { Admin } from "./admin";
import { Alumno } from "./alumno";
import { Profesor } from "./profesor";

export interface LoginResponse {
    usuario: Alumno | Profesor | Admin;
    tipoUsuario: string;
    mensaje: string;
  }