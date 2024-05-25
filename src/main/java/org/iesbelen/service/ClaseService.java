package org.iesbelen.service;

import org.iesbelen.domain.Clase;
import org.iesbelen.exception.ClaseNotFoundException;
import org.iesbelen.repository.ClaseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ClaseService {

    private final ClaseRepository claseRepository;

    public ClaseService(ClaseRepository claseRepository) {
        this.claseRepository = claseRepository;
    }

    public List<Clase> all() {
        return this.claseRepository.findAll();
    }

    public Clase one(int id) {
        return this.claseRepository.findById(id)
                .orElseThrow(() -> new ClaseNotFoundException(id));
    }

    public Clase create(Clase clase) {
        return this.claseRepository.save(clase);
    }

    public Clase update(int id, Clase updatedClase) {
        Clase clase = this.claseRepository.findById(id)
                .orElseThrow(() -> new ClaseNotFoundException(id));

        clase.setDia(updatedClase.getDia());
        clase.setHora(updatedClase.getHora());

        return this.claseRepository.save(clase);
    }

    public void delete(int id) {
        this.claseRepository.deleteById(id);
    }
}
