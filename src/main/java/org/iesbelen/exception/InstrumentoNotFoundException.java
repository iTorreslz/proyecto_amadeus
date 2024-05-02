package org.iesbelen.exception;

public class InstrumentoNotFoundException extends RuntimeException{
    public InstrumentoNotFoundException(Long id) {
        super("Not found Instrumento with id: " + id);
    }
}
