package org.iesbelen.service;

import org.iesbelen.domain.Nota;
import org.iesbelen.exception.NotaNotFoundException;
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
