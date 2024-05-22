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

    public AdmisionController(AdmisionService admisionService) {
        this.admisionService = admisionService;
    }

    // ADMISIÓN

    @GetMapping({""})
    public List<Admision> allAdmisiones() {
        log.info("Accediendo a todas las admisiones");
        return this.admisionService.all();
    }

    @GetMapping("/{id}")
    public Admision oneAdmision(@PathVariable("id") Long id) {
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
    public void delete(@PathVariable("id") Long id) {
        admisionService.delete(id);
    }

    @PostMapping("/{id}/decision")
    public void decision(@RequestBody Admision admision, @PathVariable("id") Long id) {
        if (admision != null) {
            admisionService.update(id, admision);
        } else {
            System.out.println("Error. Objeto Admisión erróneo.");
        }
    }
}
