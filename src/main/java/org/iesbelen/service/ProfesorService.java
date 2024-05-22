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

    public Profesor oneByEmail(String email) {
        return this.profesorRepository.findByEmail(email);
    }

    public Profesor create(Profesor profesor) {
        return this.profesorRepository.save(profesor);
    }

    public Profesor update(Long id, Profesor updatedProfesor) {
        Profesor profesor = this.profesorRepository.findById(id)
                .orElseThrow(() -> new ProfesorNotFoundException(id));

        profesor.setEmail(updatedProfesor.getEmail());
        profesor.setPassword(updatedProfesor.getPassword());
        profesor.setNombre(updatedProfesor.getNombre());
        profesor.setApellidos(updatedProfesor.getApellidos());
        profesor.setIdInstrumento(updatedProfesor.getIdInstrumento());

        return this.profesorRepository.save(profesor);
    }

    public void delete(Long id) {
        Profesor profesor = this.profesorRepository.findById(id)
                .orElseThrow(() -> new ProfesorNotFoundException(id));

        this.profesorRepository.delete(profesor);
    }
}
