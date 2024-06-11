export interface Tarea {
    id: number;
    titulo: string;
    fechaPublicacion: string;
    fechaEntrega: string;
    idAlumno: number;
    idProfesor: number;
    descripcion: string;
    completada: boolean;
}
