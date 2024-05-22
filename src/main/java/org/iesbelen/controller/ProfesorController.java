package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Profesor;
import org.iesbelen.service.ProfesorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/profesores")
public class ProfesorController {
    private final ProfesorService profesorService;

    public ProfesorController(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @GetMapping({""})
    public List<Profesor> all() {
        log.info("Accediendo a todos los profesores");
        return this.profesorService.all();
    }

    @PostMapping({"/nuevo"})
    public ResponseEntity<Void> create(@RequestBody Profesor nuevoProfesor) {
        log.info("Creando un nuevo profesor");
        this.profesorService.create(nuevoProfesor);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public Profesor one(@PathVariable("id") Long id) {
        log.info("Accediendo al profesor con código {}", id);
        return this.profesorService.one(id);
    }

    @PostMapping("/edit/{id}")
    public ResponseEntity<Void> update(@PathVariable("id") Long id, @RequestBody Profesor updatedProfesor) {
        log.info("Actualizando el profesor con código {}", id);
        this.profesorService.update(id, updatedProfesor);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable("id") Long id) {
        log.info("Eliminando el profesor con código {}", id);
        profesorService.delete(id);
        Map<String, String> response = new HashMap<>();
        response.put("respuesta", "Profesor eliminado correctamente");
        return ResponseEntity.ok(response);
    }
}
