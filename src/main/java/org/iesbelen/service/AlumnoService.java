package org.iesbelen.service;

import org.iesbelen.dao.AlumnoDAO;
import org.iesbelen.modelo.Alumno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AlumnoService {

    @Autowired
    private AlumnoDAO alumnoDAO;

    public List<Alumno> listAll() {
        return alumnoDAO.getAll();
    }
}
