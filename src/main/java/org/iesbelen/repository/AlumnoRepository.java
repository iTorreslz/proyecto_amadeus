package org.iesbelen.repository;

import org.iesbelen.domain.Alumno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Integer> {

    Alumno findByEmail(String email);
}
