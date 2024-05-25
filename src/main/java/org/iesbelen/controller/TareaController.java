package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Tarea;
import org.iesbelen.service.TareaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tareas")
public class TareaController {
    private final TareaService tareaService;

    public TareaController(TareaService tareaService) {
        this.tareaService = tareaService;
    }

    // ADMISIÓN

    @GetMapping({""})
    public List<Tarea> allTareas() {
        log.info("Accediendo a todas las tareas");
        return this.tareaService.all();
    }

    @GetMapping("/{id}")
    public Tarea oneTarea(@PathVariable("id") int id) {
        log.info("Accediendo a la tarea con código {}", id);
        return this.tareaService.one(id);
    }

    @PostMapping("/nuevo")
    public ResponseEntity<Void> create(@RequestBody Tarea tarea) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
        LocalDateTime fechaHoraPublicacion = LocalDateTime.parse(tarea.getFechaPublicacionString(), formatter);
        tarea.setFechaPublicacion(fechaHoraPublicacion);
        LocalDateTime fechaHoraEntrega = LocalDateTime.parse(tarea.getFechaEntregaString(), formatter);
        tarea.setFechaEntrega(fechaHoraEntrega);
        log.info("Creando una nueva tarea");
        this.tareaService.create(tarea);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/edit/{id}")
    public void edit(@RequestBody Tarea tarea, @PathVariable("id") int id) {
        if (tarea != null) {
            tareaService.update(id, tarea);
        } else {
            System.out.println("Error. Objeto Tarea errónea.");
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") int id) {
        tareaService.delete(id);
    }
}
