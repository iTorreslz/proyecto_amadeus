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

    public Alumno oneByEmail(String email) {
        return this.alumnoRepository.findByEmail(email);
    }

    public Alumno create(Alumno alumno) {
        return this.alumnoRepository.save(alumno);
    }

    public Alumno update(Long id, Alumno updatedAlumno) {
        Alumno alumno = this.alumnoRepository.findById(id)
                .orElseThrow(() -> new AlumnoNotFoundException(id));

        alumno.setEmail(updatedAlumno.getEmail());
        alumno.setPassword(updatedAlumno.getPassword());
        alumno.setNombre(updatedAlumno.getNombre());
        alumno.setApellidos(updatedAlumno.getApellidos());
        alumno.setCurso(updatedAlumno.getCurso());
        alumno.setIdInstrumento(updatedAlumno.getIdInstrumento());

        return this.alumnoRepository.save(alumno);
    }

    public void delete(Long id) {
        Alumno alumno = this.alumnoRepository.findById(id)
                .orElseThrow(() -> new AlumnoNotFoundException(id));

        this.alumnoRepository.delete(alumno);
    }
}
