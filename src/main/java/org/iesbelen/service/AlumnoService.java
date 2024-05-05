package org.iesbelen.service;

import org.iesbelen.domain.Alumno;
import org.iesbelen.exception.AlumnoNotFoundException;
import org.iesbelen.repository.AlumnoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoService(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    public List<Alumno> all() {
        return this.alumnoRepository.findAll();
    }

    public Alumno one(Long id) {
        return this.alumnoRepository.findById(id)
                .orElseThrow(() -> new AlumnoNotFoundException(id));
    }

    public Alumno create(Alumno alumno) {
        return this.alumnoRepository.save(alumno);
    }
}
