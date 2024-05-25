package org.iesbelen.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="clase")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Clase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="dia")
    private String dia;

    @Column(name="hora")
    private String hora;

    @Column(name="id_alumno")
    private int idAlumno;

    @Column(name="id_profesor")
    private int idProfesor;
}
