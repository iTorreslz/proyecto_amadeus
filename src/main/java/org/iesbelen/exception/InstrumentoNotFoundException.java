package org.iesbelen.exception;

public class InstrumentoNotFoundException extends RuntimeException{
    public InstrumentoNotFoundException(int id) {
        super("Not found Instrumento with id: " + id);
    }
}
