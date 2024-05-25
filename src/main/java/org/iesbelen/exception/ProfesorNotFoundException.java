package org.iesbelen.exception;

public class ProfesorNotFoundException extends RuntimeException{
    public ProfesorNotFoundException(int id) {
        super("Not found Profesor with id: " + id);
    }
}
