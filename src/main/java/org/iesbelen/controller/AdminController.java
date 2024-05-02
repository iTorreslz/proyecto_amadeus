package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Alumno;
import org.iesbelen.domain.Profesor;
import org.iesbelen.service.AlumnoService;
import org.iesbelen.service.ProfesorService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin")
public class AdminController {
    private final AlumnoService alumnoService;
    private final ProfesorService profesorService;

    public AdminController(AlumnoService alumnoService, ProfesorService profesorService) {
        this.alumnoService = alumnoService;
        this.profesorService = profesorService;
    }

    @GetMapping({"", "/alumnos"})
    public List<Alumno> allAlumnos() {
        log.info("Accediendo a todos los alumnos");
        return this.alumnoService.all();
    }

    @GetMapping("/alumnos/{id}")
    public Alumno oneAlumno(@PathVariable("id") Long id) {
        log.info("Accediendo al alumno con código {}", id);
        return this.alumnoService.one(id);
    }

    @GetMapping({"", "/profesores"})
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
