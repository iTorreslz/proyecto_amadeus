package org.iesbelen.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.iesbelen.domain.*;
import org.iesbelen.service.AdminService;
import org.iesbelen.service.AlumnoService;
import org.iesbelen.service.ProfesorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
@RequestMapping("/auth")
public class AuthController {
    private final ProfesorService profesorService;
    private final AlumnoService alumnoService;
    private final AdminService adminService;

    public AuthController(AlumnoService alumnoService, ProfesorService profesorService, AdminService adminService) {
        this.alumnoService = alumnoService;
        this.profesorService = profesorService;
        this.adminService = adminService;
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
    public ResponseEntity<RespuestaLogin> login(@RequestBody Credenciales cred) {
        Object usuarioAutenticado = null;
        String tipoUsuario = "0";
        String mensaje = "";

        if (alumnoService.oneByEmail(cred.getEmail()) != null) {
            usuarioAutenticado = alumnoService.oneByEmail(cred.getEmail());
            tipoUsuario = "1";
        } else if (profesorService.oneByEmail(cred.getEmail()) != null) {
            usuarioAutenticado = profesorService.oneByEmail(cred.getEmail());
            tipoUsuario = "2";
        } else if (adminService.oneByEmail(cred.getEmail()) != null) {
            usuarioAutenticado = adminService.oneByEmail(cred.getEmail());
            tipoUsuario = "3";
        } else {
            mensaje = "Error al iniciar sesión.";
        }

        if (usuarioAutenticado != null) {
            mensaje = "Inicio de sesión exitoso.";
        }

        System.out.println(mensaje);
        RespuestaLogin response = new RespuestaLogin(usuarioAutenticado, tipoUsuario, mensaje);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        response.put("respuesta", "Logout exitoso.");
        System.out.println("Logout exitoso.");
        return ResponseEntity.ok(response);
    }
}
