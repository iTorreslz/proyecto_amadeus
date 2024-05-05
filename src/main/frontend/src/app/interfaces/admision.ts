import {Alumno} from "./alumno";

export interface Admision {
    idAdmision: number;
    alumno: Alumno;
    decision: boolean;
    instrumento: {
        id: number;
        nombre: string;
    };
}
