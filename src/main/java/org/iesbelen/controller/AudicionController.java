package org.iesbelen.controller;

import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.*;
import org.iesbelen.service.*;
import org.springframework.web.bind.annotation.*;

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
    public Audicion oneAudicion(@PathVariable("id") Long id) {
        log.info("Accediendo a la audición con código {}", id);
        return this.audicionService.one(id);
    }
}
