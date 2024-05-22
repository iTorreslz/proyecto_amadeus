package org.iesbelen.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="instrumento")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Instrumento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="nombre")
    private String nombre;
}
