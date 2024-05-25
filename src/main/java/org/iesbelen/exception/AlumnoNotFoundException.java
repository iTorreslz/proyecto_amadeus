package org.iesbelen.exception;

public class AlumnoNotFoundException extends RuntimeException{
    public AlumnoNotFoundException(int id) {
        super("Not found Alumno with id: " + id);
    }
}
