package org.iesbelen.service;

import org.iesbelen.domain.Audicion;
import org.iesbelen.exception.AudicionNotFoundException;
import org.iesbelen.repository.AudicionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AudicionService {

    private final AudicionRepository audicionRepository;

    public AudicionService(AudicionRepository audicionRepository) {
        this.audicionRepository = audicionRepository;
    }

    public List<Audicion> all() {
        return this.audicionRepository.findAll();
    }

    public Audicion one(Long id) {
        return this.audicionRepository.findById(id)
                .orElseThrow(() -> new AudicionNotFoundException(id));
    }

    public Audicion create(Audicion audicion) {
        return this.audicionRepository.save(audicion);
    }
}
