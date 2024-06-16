package org.iesbelen.service;

import org.iesbelen.domain.Nota;
import org.iesbelen.domain.Profesor;
import org.iesbelen.exception.NotaNotFoundException;
import org.iesbelen.exception.ProfesorNotFoundException;
import org.iesbelen.repository.NotaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaService {

    private final NotaRepository notaRepository;

    public NotaService(NotaRepository notaRepository) {
        this.notaRepository = notaRepository;
    }

    public List<Nota> all() {
        return this.notaRepository.findAll();
    }

    public Nota one(int id) {
        return this.notaRepository.findById(id)
                .orElseThrow(() -> new NotaNotFoundException(id));
    }

    public Nota create(Nota nota) {
        return this.notaRepository.save(nota);
    }

    public Nota update(int id, Nota updatedNota) {
        Nota nota = this.notaRepository.findById(id)
                .orElseThrow(() -> new NotaNotFoundException(id));

        nota.setNombre(updatedNota.getNombre());
        nota.setCalificacion(updatedNota.getCalificacion());
        nota.setIdAlumno(updatedNota.getIdAlumno());
        nota.setIdProfesor(updatedNota.getIdProfesor());

        return this.notaRepository.save(nota);
    }

    public void delete(int id) {
        this.notaRepository.deleteById(id);
    }
}
