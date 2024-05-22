package org.iesbelen.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="admision")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Admision {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="id_alumno")
    private int idAlumno;

    @Column(name="apto")
    private boolean apto;

    @Column(name="no_apto")
    private boolean noApto;

    @Column(name="instrumento")
    private int instrumento;
}
