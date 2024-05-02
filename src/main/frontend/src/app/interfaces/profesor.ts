export interface Profesor {
    id: number;
    nombre: string;
    apellidos: string;
    instrumento: {
        id: number;
        nombre: string;
    };
}
