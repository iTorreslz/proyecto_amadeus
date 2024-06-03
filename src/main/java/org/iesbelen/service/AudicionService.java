package org.iesbelen.service;

import org.iesbelen.domain.Audicion;
import org.iesbelen.domain.Tarea;
import org.iesbelen.exception.AudicionNotFoundException;
import org.iesbelen.exception.TareaNotFoundException;
import org.iesbelen.repository.AudicionRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class AudicionService {

    private final AudicionRepository audicionRepository;

    public AudicionService(AudicionRepository audicionRepository) {
        this.audicionRepository = audicionRepository;
    }

    public List<Audicion> all() {
        List<Audicion> audiciones = this.audicionRepository.findAll();
        audiciones.sort(Comparator.comparing(Audicion::getDiaHora));
        return audiciones;
    }

    public Audicion one(int id) {
        return this.audicionRepository.findById(id)
                .orElseThrow(() -> new AudicionNotFoundException(id));
    }

    public Audicion create(Audicion audicion) {
        return this.audicionRepository.save(audicion);
    }

    public Audicion update(int id, Audicion updatedAudicion) {
        Audicion audicion = this.audicionRepository.findById(id)
                .orElseThrow(() -> new AudicionNotFoundException(id));

        audicion.setIdInstrumento(updatedAudicion.getIdInstrumento());
        audicion.setDiaHora(updatedAudicion.getDiaHora());

        return this.audicionRepository.save(audicion);
    }

    public void delete(int id) { this.audicionRepository.deleteById(id); }
}
