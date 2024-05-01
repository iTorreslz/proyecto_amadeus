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
public class AlumnoController {
    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @PostMapping("/nuevoAlumno")
    public Alumno create(@RequestBody Alumno alumno) {
        log.info("Creando un nuevo alumno");
        return this.alumnoService.create(alumno);
    }

    @GetMapping("/alumnos/{id}")
    public Alumno one(@PathVariable("id") Long id) {
        log.info("Accediendo al alumno con código {}", id);
        return this.alumnoService.one(id);
    }

}
