package org.iesbelen.exception;

public class AudicionNotFoundException extends RuntimeException{
    public AudicionNotFoundException(Long id) {
        super("Not found Audicion with id: " + id);
    }
}
