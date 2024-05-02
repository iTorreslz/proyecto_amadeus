package org.iesbelen.exception;

public class AdmisionNotFoundException extends RuntimeException{
    public AdmisionNotFoundException(Long id) {
        super("Not found Admision with id: " + id);
    }
}
