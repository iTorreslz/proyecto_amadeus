package org.iesbelen.repository;

import org.iesbelen.domain.Profesor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfesorRepository extends JpaRepository<Profesor, Integer> {

    Profesor findByEmail(String email);
    Profesor findByIdInstrumento(int idInstrumento);
}
