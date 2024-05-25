package org.iesbelen.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="tarea")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Tarea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "publicacion")
    private LocalDateTime fechaPublicacion;

    @Transient
    private String fechaPublicacionString;

    @Column(name = "entrega")
    private LocalDateTime fechaEntrega;

    @Transient
    private String fechaEntregaString;

    @Column(name = "id_alumno")
    private int idAlumno;

    @Column(name = "id_profesor")
    private int idProfesor;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "completada")
    private boolean completada;
}
