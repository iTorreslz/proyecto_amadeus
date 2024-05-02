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
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private long id;

    @ManyToOne
    @JoinColumn(name="id_alumno")
    private Alumno alumno;

    @Column(name="decision")
    private boolean decision;

    @ManyToOne
    @JoinColumn(name="instrumento")
    private Instrumento instrumento;
}
