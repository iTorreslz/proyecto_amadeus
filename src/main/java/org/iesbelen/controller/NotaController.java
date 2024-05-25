package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Nota;
import org.iesbelen.service.NotaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/notas")
public class NotaController {
    private final NotaService notaService;

    public NotaController(NotaService notaService) {
        this.notaService = notaService;
    }

    // ADMISIÓN

    @GetMapping({""})
    public List<Nota> allNotas() {
        log.info("Accediendo a todas las notas");
        return this.notaService.all();
    }

    @PostMapping("/nuevo")
    public ResponseEntity<Void> create(@RequestBody Nota nota) {
        log.info("Creando una nueva nota");
        this.notaService.create(nota);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/edit/{id}")
    public void edit(@RequestBody Nota nota, @PathVariable("id") int id) {
        if (nota != null) {
            notaService.update(id, nota);
        } else {
            System.out.println("Error. Objeto nota erróneo.");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        notaService.delete(id);
    }
}
