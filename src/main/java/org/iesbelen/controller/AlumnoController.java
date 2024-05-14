package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.iesbelen.domain.Admision;
import org.iesbelen.domain.Alumno;
import org.iesbelen.service.AdmisionService;
import org.iesbelen.service.AlumnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/alumnos")
public class AlumnoController {
    private final AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService, AdmisionService admisionService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping({""})
    public List<Alumno> all() {
        log.info("Accediendo a todos los alumnos");
        return this.alumnoService.all();
    }

    @GetMapping("/{id}")
    public Alumno one(@PathVariable("id") Long id) {
        log.info("Accediendo al alumno con código {}", id);
        return this.alumnoService.one(id);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<String> update(@PathVariable("id") Long id, @RequestBody Alumno updatedAlumno) {
        log.info("Actualizando el alumno con código {}", id);
        this.alumnoService.update(id, updatedAlumno);
        return new ResponseEntity<>("Alumno modificado correctamente", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable("id") Long id) {
        log.info("Eliminando el alumno con código {}", id);
        alumnoService.delete(id);
        Map<String, String> response = new HashMap<>();
        response.put("respuesta", "Alumno eliminado correctamente");
        return ResponseEntity.ok(response);
    }
}
