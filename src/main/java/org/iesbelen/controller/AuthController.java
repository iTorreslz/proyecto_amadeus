package org.iesbelen.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.Alumno;
import org.iesbelen.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Alumno alumno) {
        Map<String, String> response = new HashMap<>();
        alumnoService.create(alumno);
        response.put("respuesta", "Registro exitoso");
        return ResponseEntity.ok(response);
    }

    // LOGIN

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestParam String username, @RequestParam String password, HttpServletRequest request) {
        List<Alumno> alumnos = alumnoService.all();
        Map<String, String> response = new HashMap<>();
        HttpSession session = request.getSession();

        boolean found = false;

        for (Alumno alumno : alumnos) {
            if (alumno.getEmail().equals(username) && alumno.getPassword().equals(password)) {
                session.setAttribute("username", username);
                response.put("respuesta", "Login exitoso");
                System.out.println(session.getAttribute("username"));
                found = true;
                break;
            }
        }

        if (!found) {
            response.put("respuesta", "Credenciales inválidas");
            System.out.println(session.getAttribute("username"));
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate();
        Map<String, String> response = new HashMap<>();
        response.put("respuesta", "Logout exitoso");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logueado")
    public boolean logueado(HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println(session.getAttribute("username"));
        return session.getAttribute("username") != null;
    }
}
