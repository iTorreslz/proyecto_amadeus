package org.iesbelen.controlador;

import org.iesbelen.modelo.Alumno;
import org.iesbelen.service.AlumnoService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class AlumnoController {

    private AlumnoService alumnoService;

    public AlumnoController(AlumnoService alumnoService) {
        this.alumnoService = alumnoService;
    }

    @GetMapping("/admin/alumnos")
    public String listar(Model model) {

        List<Alumno> listaAlumnos = alumnoService.listAll();
        model.addAttribute("listaAlumnos", listaAlumnos);

        return "admin/alumnos/alumnos";
    }
}
