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

import java.security.NoSuchAlgorithmException;
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
    public ResponseEntity<Map<String, String>> register(@RequestBody Alumno alumno) throws NoSuchAlgorithmException {
        Map<String, String> response = new HashMap<>();
        String encodedPasswd = Alumno.hashPassword(alumno.getPassword());
        alumno.setPassword(encodedPasswd);
        alumno.setIdInstrumento(-1);
        alumnoService.create(alumno);
        response.put("respuesta", "Registro exitoso");
        return ResponseEntity.ok(response);
    }

    // LOGIN

    @PostMapping("/login")
    public ResponseEntity<RespuestaLogin> login(@RequestBody Credenciales cred) throws NoSuchAlgorithmException {
        Object usuarioAutenticado = null;
        String tipoUsuario = "0";
        String mensaje = "";

        if (alumnoService.oneByEmail(cred.getEmail()) != null) {
            Alumno usuarioNoAutenticado = alumnoService.oneByEmail(cred.getEmail());
            String encodedPasswd = Alumno.hashPassword(cred.getPassword());

            if (usuarioNoAutenticado.getPassword().equals(encodedPasswd)) {
                usuarioAutenticado = alumnoService.oneByEmail(cred.getEmail());
                tipoUsuario = "1";
            } else {
                mensaje = "Contraseña incorrecta.";
            }
        } else if (profesorService.oneByEmail(cred.getEmail()) != null) {
            Profesor usuarioNoAutenticado = profesorService.oneByEmail(cred.getEmail());
            String encodedPasswd = Alumno.hashPassword(cred.getPassword());

            if (usuarioNoAutenticado.getPassword().equals(encodedPasswd)) {
                usuarioAutenticado = profesorService.oneByEmail(cred.getEmail());
                tipoUsuario = "2";
            } else {
                mensaje = "Contraseña incorrecta.";
            }
        } else if (adminService.oneByEmail(cred.getEmail()) != null) {
            Admin usuarioNoAutenticado = adminService.oneByEmail(cred.getEmail());
            String encodedPasswd = Alumno.hashPassword(cred.getPassword());

            if (usuarioNoAutenticado.getPassword().equals(encodedPasswd)) {
                usuarioAutenticado = adminService.oneByEmail(cred.getEmail());
                tipoUsuario = "3";
            } else {
                mensaje = "Contraseña incorrecta.";
            }
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

    // LOGOUT

    @GetMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(HttpServletRequest request) {
        Map<String, String> response = new HashMap<>();
        response.put("respuesta", "Logout exitoso.");
        System.out.println("Logout exitoso.");
        return ResponseEntity.ok(response);
    }

    // ENCRYPT

    @PostMapping("/encrypt")
    public ResponseEntity<Map<String, String>> encrypt(@RequestBody PasswdToEncrypt passwd) throws NoSuchAlgorithmException {
        Map<String, String> response = new HashMap<>();
        response.put("respuesta", Alumno.hashPassword(passwd.getPassword()));
        return ResponseEntity.ok(response);
    }
}
