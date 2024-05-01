package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Alumno;
import org.iesbelen.service.AlumnoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admin")
public class AdminController {
    private final AlumnoService alumnoService;

    public AdminController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping({"", "/alumnos"})
    public List<Alumno> all() {
        log.info("Accediendo a todos los alumnos");
        return this.alumnoService.all();
    }

    @GetMapping("/alumnos/{id}")
    public Alumno one(@PathVariable("id") Long id) {
        log.info("Accediendo al alumno con código {}", id);
        return this.alumnoService.one(id);
    }

}
