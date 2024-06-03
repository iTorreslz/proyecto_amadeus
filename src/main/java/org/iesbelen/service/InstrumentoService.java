package org.iesbelen.service;

import org.iesbelen.domain.Instrumento;
import org.iesbelen.exception.InstrumentoNotFoundException;
import org.iesbelen.repository.InstrumentoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InstrumentoService {

    private final InstrumentoRepository instrumentoRepository;

    public InstrumentoService(InstrumentoRepository instrumentoRepository) {
        this.instrumentoRepository = instrumentoRepository;
    }

    public List<Instrumento> all() {
        return this.instrumentoRepository.findAll();
    }

    public Instrumento one(int id) {
        return this.instrumentoRepository.findById(id)
                .orElseThrow(() -> new InstrumentoNotFoundException(id));
    }
}
