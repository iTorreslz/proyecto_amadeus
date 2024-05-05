package org.iesbelen.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Alumno;
import org.iesbelen.domain.Profesor;
import org.iesbelen.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/auth")
public class AuthController {
    private final ProfesorService profesorService;
    private final AlumnoService alumnoService;

    public AuthController(AlumnoService alumnoService, ProfesorService profesorService) {
        this.alumnoService = alumnoService;
        this.profesorService = profesorService;
    }

    // LOGIN

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        List<Alumno> alumnos = alumnoService.all();
        Map<String, String> response = new HashMap<>();
        for (Alumno alumno : alumnos) {
            if (alumno.getEmail().equals(username) && alumno.getPassword().equals(password)) {
                HttpSession session = request.getSession();
                session.setAttribute("username", username);
                response.put("respuesta", "Login exitoso");
            } else {
                response.put("respuesta", "Credenciales inválidas");
            }
            return ResponseEntity.ok(response);
        }
        response.put("respuesta", "No existe alumno");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logueado")
    public boolean logueado(HttpServletRequest request) {
        HttpSession session = request.getSession();
        return session.getAttribute("username") != null;
    }
}
