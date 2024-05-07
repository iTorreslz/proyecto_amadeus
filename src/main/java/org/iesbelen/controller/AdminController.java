package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.*;
import org.iesbelen.service.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin")
public class AdminController {
    private final AdmisionService admisionService;
    private final AlumnoService alumnoService;
    private final AudicionService audicionService;
    private final InstrumentoService instrumentoService;
    private final ProfesorService profesorService;

    public AdminController(AdmisionService admisionService, AlumnoService alumnoService, AudicionService audicionService,
                           InstrumentoService instrumentoService, ProfesorService profesorService) {
        this.admisionService = admisionService;
        this.alumnoService = alumnoService;
        this.audicionService = audicionService;
        this.instrumentoService = instrumentoService;
        this.profesorService = profesorService;
    }

    // ADMISIÓN

    @GetMapping({"/admisiones"})
    public List<Admision> allAdmisiones() {
        log.info("Accediendo a todas las admisiones");
        return this.admisionService.all();
    }

    @GetMapping("/admisiones/{id}")
    public Admision oneAdmision(@PathVariable("id") Long id) {
        log.info("Accediendo a la admisión con código {}", id);
        return this.admisionService.one(id);
    }

    // AUDICIÓN

    @GetMapping({"/audiciones"})
    public List<Audicion> allAudiciones() {
        log.info("Accediendo a todas las audiciones");
        return this.audicionService.all();
    }

    @GetMapping("/audiciones/{id}")
    public Audicion oneAudicion(@PathVariable("id") Long id) {
        log.info("Accediendo a la audición con código {}", id);
        return this.audicionService.one(id);
    }

    // INSTRUMENTO

    @GetMapping({"/instrumentos"})
    public List<Instrumento> allInstrumentos() {
        log.info("Accediendo a todos los instrumentos");
        return this.instrumentoService.all();
    }

    @GetMapping("/instrumentos/{id}")
    public Instrumento oneInstrumento(@PathVariable("id") Long id) {
        log.info("Accediendo al instrumento con código {}", id);
        return this.instrumentoService.one(id);
    }

    // PROFESOR

    @GetMapping({"/profesores"})
    public List<Profesor> allProfesores() {
        log.info("Accediendo a todos los profesores");
        return this.profesorService.all();
    }

    @GetMapping("/profesores/{id}")
    public Profesor oneProfesor(@PathVariable("id") Long id) {
        log.info("Accediendo al profesor con código {}", id);
        return this.profesorService.one(id);
    }
}
