package org.iesbelen.service;

import org.iesbelen.domain.Tarea;
import org.iesbelen.exception.TareaNotFoundException;
import org.iesbelen.repository.TareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TareaService {

    private final TareaRepository tareaRepository;

    public TareaService(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    public List<Tarea> all() {
        return this.tareaRepository.findAll();
    }

    public Tarea one(int id) {
        return this.tareaRepository.findById(id)
                .orElseThrow(() -> new TareaNotFoundException(id));
    }

    public Tarea create(Tarea tarea) {
        return this.tareaRepository.save(tarea);
    }

    public Tarea update(int id, Tarea updatedTarea) {
        Tarea tarea = this.tareaRepository.findById(id)
                .orElseThrow(() -> new TareaNotFoundException(id));

        if (updatedTarea.getIdAlumno() == -1) {
            tarea.setCompletada(updatedTarea.isCompletada());
        } else {
            tarea.setFechaEntrega(updatedTarea.getFechaEntrega());
            tarea.setIdAlumno(updatedTarea.getIdAlumno());
            tarea.setDescripcion(updatedTarea.getDescripcion());
            tarea.setCompletada(updatedTarea.isCompletada());
        }
        return this.tareaRepository.save(tarea);
    }

    public void delete(int id) {
        this.tareaRepository.deleteById(id);
    }
}
