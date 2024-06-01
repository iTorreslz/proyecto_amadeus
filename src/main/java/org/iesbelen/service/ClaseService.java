package org.iesbelen.service;

import org.iesbelen.domain.Alumno;
import org.iesbelen.domain.Clase;
import org.iesbelen.domain.Profesor;
import org.iesbelen.exception.ClaseNotFoundException;
import org.iesbelen.repository.AlumnoRepository;
import org.iesbelen.repository.ClaseRepository;
import org.iesbelen.repository.ProfesorRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClaseService {

    private final ClaseRepository claseRepository;
    private final ProfesorRepository profesorRepository;
    private final AlumnoRepository alumnoRepository;

    public ClaseService(
            ClaseRepository claseRepository, ProfesorRepository profesorRepository,
            AlumnoRepository alumnoRepository
    ) {
        this.claseRepository = claseRepository;
        this.profesorRepository = profesorRepository;
        this.alumnoRepository = alumnoRepository;
    }

    public List<Clase> all() {
        return this.claseRepository.findAll();
    }

    public Clase one(int id) {
        return this.claseRepository.findById(id)
                .orElseThrow(() -> new ClaseNotFoundException(id));
    }

    public Clase create(Clase clase) {
        Optional<Alumno> alumno = this.alumnoRepository.findById(clase.getIdAlumno());
        if (alumno.isPresent()) {
            Profesor profesor = this.profesorRepository.findByIdInstrumento(alumno.get().getIdInstrumento());
            clase.setIdProfesor(profesor.getId());
            return this.claseRepository.save(clase);
        } else {
            return null;
        }
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
