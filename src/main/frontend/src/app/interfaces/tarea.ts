export interface Tarea {
    id: number;
    fechaPublicacion: string;
    fechaEntrega: string;
    idAlumno: number;
    idProfesor: number;
    descripcion: string;
    completada: boolean;
}
