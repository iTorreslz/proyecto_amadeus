package org.iesbelen.exception;

public class TareaNotFoundException extends RuntimeException{
    public TareaNotFoundException(int id) {
        super("Not found Tarea with id: " + id);
    }
}
