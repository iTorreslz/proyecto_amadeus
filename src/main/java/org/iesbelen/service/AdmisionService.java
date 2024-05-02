package org.iesbelen.service;

import org.iesbelen.domain.Admision;
import org.iesbelen.exception.AdmisionNotFoundException;
import org.iesbelen.repository.AdmisionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmisionService {

    private final AdmisionRepository admisionRepository;

    public AdmisionService(AdmisionRepository admisionRepository) {
        this.admisionRepository = admisionRepository;
    }

    public List<Admision> all() {
        return this.admisionRepository.findAll();
    }

    public Admision one(Long id) {
        return this.admisionRepository.findById(id)
                .orElseThrow(() -> new AdmisionNotFoundException(id));
    }

    public Admision create(Admision admision) {
        return this.admisionRepository.save(admision);
    }
}
