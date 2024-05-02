package org.iesbelen.repository;

import org.iesbelen.domain.Admision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdmisionRepository extends JpaRepository<Admision, Long> {

}
