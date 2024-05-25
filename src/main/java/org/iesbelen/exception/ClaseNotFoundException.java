package org.iesbelen.exception;

public class ClaseNotFoundException extends RuntimeException{
    public ClaseNotFoundException(int id) {
        super("Not found Clase with id: " + id);
    }
}
