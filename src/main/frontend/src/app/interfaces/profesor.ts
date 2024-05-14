export interface Profesor {
    id: number;
    email: string;
    password: string;
    nombre: string;
    apellidos: string;
    instrumento: {
        id: number;
        nombre: string;
    };
}
