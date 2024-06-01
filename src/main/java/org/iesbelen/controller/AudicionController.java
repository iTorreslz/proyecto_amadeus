package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.*;
import org.iesbelen.service.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/audiciones")
public class AudicionController {
    private final AudicionService audicionService;

    public AudicionController(AudicionService audicionService) {
        this.audicionService = audicionService;
    }

    // AUDICIÓN

    @GetMapping({""})
    public List<Audicion> allAudiciones() {
        log.info("Accediendo a todas las audiciones");
        return this.audicionService.all();
    }

    @GetMapping("/{id}")
    public Audicion oneAudicion(@PathVariable("id") int id) {
        log.info("Accediendo a la audición con código {}", id);
        return this.audicionService.one(id);
    }

    @PostMapping({"/nuevo"})
    public ResponseEntity<Void> create(@RequestBody Audicion nuevaAud) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        LocalDateTime fechaHora = LocalDateTime.parse(nuevaAud.getDiaHoraString(), formatter);
        nuevaAud.setDiaHora(fechaHora);
        log.info("Publicando nueva audición");
        this.audicionService.create(nuevaAud);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        audicionService.delete(id);
    }
}
