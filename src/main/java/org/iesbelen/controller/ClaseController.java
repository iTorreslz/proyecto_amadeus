package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Clase;
import org.iesbelen.service.ClaseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/clases")
public class ClaseController {
    private final ClaseService claseService;

    public ClaseController(ClaseService claseService) {
        this.claseService = claseService;
    }

    // ADMISIÓN

    @GetMapping({""})
    public List<Clase> allClases() {
        log.info("Accediendo a todas las clases");
        return this.claseService.all();
    }

    @GetMapping("/{id}")
    public Clase oneClase(@PathVariable("id") int id) {
        log.info("Accediendo a la clase con código {}", id);
        return this.claseService.one(id);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<Void> create(@RequestBody Clase clase) {
        log.info("Creando una nueva clase");
        this.claseService.create(clase);
        System.out.println(new ResponseEntity<>(HttpStatus.CREATED));
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/edit/{id}")
    public void edit(@RequestBody Clase clase, @PathVariable("id") int id) {
        if (clase != null) {
            claseService.update(id, clase);
        } else {
            System.out.println("Error. Objeto clase errónea.");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        claseService.delete(id);
    }
}
