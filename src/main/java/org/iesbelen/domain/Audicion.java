package org.iesbelen.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="audicion")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Audicion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private long id;

    @Column(name="dia_hora")
    private LocalDateTime diaHora;
}
