package org.iesbelen.service;

import org.iesbelen.domain.Profesor;
import org.iesbelen.exception.ProfesorNotFoundException;
import org.iesbelen.repository.ProfesorRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProfesorService {

    private final ProfesorRepository profesorRepository;

    public ProfesorService(ProfesorRepository profesorRepository) {
        this.profesorRepository = profesorRepository;
    }

    public List<Profesor> all() {
        return this.profesorRepository.findAll();
    }

    public Profesor one(Long id) {
        return this.profesorRepository.findById(id)
                .orElseThrow(() -> new ProfesorNotFoundException(id));
    }

    public Profesor create(Profesor profesor) {
        return this.profesorRepository.save(profesor);
    }
}
