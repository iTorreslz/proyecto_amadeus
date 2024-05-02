package org.iesbelen.repository;

import org.iesbelen.domain.Audicion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AudicionRepository extends JpaRepository<Audicion, Long> {

}
