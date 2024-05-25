package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.*;
import org.iesbelen.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/admisiones")
public class AdmisionController {
    private final AdmisionService admisionService;
    private final AlumnoService alumnoService;

    public AdmisionController(AdmisionService admisionService, AlumnoService alumnoService) {
        this.admisionService = admisionService;
        this.alumnoService = alumnoService;
    }

    // ADMISIÓN

    @GetMapping({""})
    public List<Admision> allAdmisiones() {
        log.info("Accediendo a todas las admisiones");
        return this.admisionService.all();
    }

    @GetMapping("/{id}")
    public Admision oneAdmision(@PathVariable("id") int id) {
        log.info("Accediendo a la admisión con código {}", id);
        return this.admisionService.one(id);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<Void> create(@RequestBody Admision admision) {
        log.info("Creando una nueva admisión");
        this.admisionService.create(admision);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        admisionService.delete(id);
    }

    @PostMapping("/{id}/decision")
    public void decision(@RequestBody Admision admision, @PathVariable("id") int id) {
        if (admision != null) {
            admisionService.update(id, admision);
            Alumno alumno = alumnoService.one(admision.getIdAlumno());
            alumno.setCurso(1);
            alumno.setIdInstrumento(admision.getInstrumento());
            alumnoService.update(alumno.getId(), alumno);
        } else {
            System.out.println("Error. Objeto Admisión erróneo.");
        }
    }
}
