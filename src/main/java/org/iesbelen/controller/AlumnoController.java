package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Admision;
import org.iesbelen.domain.Alumno;
import org.iesbelen.service.AdmisionService;
import org.iesbelen.service.AlumnoService;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/alumnos")
public class AlumnoController {
    private final AlumnoService alumnoService;
    private final AdmisionService admisionService;

    public AlumnoController(AlumnoService alumnoService, AdmisionService admisionService) {
        this.alumnoService = alumnoService;
        this.admisionService = admisionService;
    }

    @PostMapping("/nuevoAlumno")
    public Alumno create(@RequestBody Alumno alumno) {
        log.info("Creando un nuevo alumno");
        return this.alumnoService.create(alumno);
    }

    @PostMapping("/nuevaAdmision")
    public Admision create(@RequestBody Admision admision) {
        log.info("Creando una nueva admisión para un alumno");
        return this.admisionService.create(admision);
    }
}
