package org.iesbelen.exception;

public class AlumnoNotFoundException extends RuntimeException{
    public AlumnoNotFoundException(Long id) {
        super("Not found Alumno with id: " + id);
    }
}
