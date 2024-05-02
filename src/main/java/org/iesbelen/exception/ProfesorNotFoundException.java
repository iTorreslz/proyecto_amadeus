package org.iesbelen.exception;

public class ProfesorNotFoundException extends RuntimeException{
    public ProfesorNotFoundException(Long id) {
        super("Not found Profesor with id: " + id);
    }
}
