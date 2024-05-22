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

    public Admision create(Admision admision) {
        return this.admisionRepository.save(admision);
    }

    public List<Admision> all() {
        return this.admisionRepository.findAll();
    }

    public Admision one(Long id) {
        return this.admisionRepository.findById(id)
                .orElseThrow(() -> new AdmisionNotFoundException(id));
    }

    public Admision update(Long id, Admision updatedAdmision) {
        return this.admisionRepository.findById(id)
                .map(admision -> {
                    admision.setApto(updatedAdmision.isApto());
                    admision.setNoApto(updatedAdmision.isNoApto());
                    return this.admisionRepository.save(admision);
                })
                .orElseThrow(() -> new AdmisionNotFoundException(id));
    }

    public void delete(Long id) { this.admisionRepository.deleteById(id); }
}
