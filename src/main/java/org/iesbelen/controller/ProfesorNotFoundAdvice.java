package org.iesbelen.controller;

import org.iesbelen.exception.ProfesorNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ProfesorNotFoundAdvice {

    @ResponseBody
    @ExceptionHandler(ProfesorNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String empresaNotFoundHandler(ProfesorNotFoundException profesorNotFoundException) {
        return profesorNotFoundException.getMessage();
    }

}
