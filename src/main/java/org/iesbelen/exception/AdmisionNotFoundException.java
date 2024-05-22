package org.iesbelen.exception;

public class AdmisionNotFoundException extends RuntimeException{
    public AdmisionNotFoundException(int id) {
        super("Not found Admision with id: " + id);
    }
}
