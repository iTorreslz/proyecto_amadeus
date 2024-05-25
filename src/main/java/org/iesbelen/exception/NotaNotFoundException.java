package org.iesbelen.exception;

public class NotaNotFoundException extends RuntimeException{
    public NotaNotFoundException(int id) {
        super("Not found Nota with id: " + id);
    }
}
