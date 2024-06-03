package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Instrumento;
import org.iesbelen.domain.Tarea;
import org.iesbelen.service.InstrumentoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/instrumentos")
public class InstrumentoController {
    private final InstrumentoService instrumentoService;

    public InstrumentoController(InstrumentoService instrumentoService) {
        this.instrumentoService = instrumentoService;
    }

    @GetMapping({""})
    public List<Instrumento> allInstrumentos() {
        log.info("Accediendo a todas las instrumentos");
        return this.instrumentoService.all();
    }

    @GetMapping("/{id}")
    public Instrumento oneInstrumento(@PathVariable("id") int id) {
        log.info("Accediendo a la instrumento con código {}", id);
        return this.instrumentoService.one(id);
    }
}
