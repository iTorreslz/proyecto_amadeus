package org.iesbelen.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="nota")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="nombre")
    private String nombre;

    @Column(name="calificacion")
    private double calificacion;

    @Column(name="id_alumno")
    private int idAlumno;

    @Column(name="id_profesor")
    private int idProfesor;
}
