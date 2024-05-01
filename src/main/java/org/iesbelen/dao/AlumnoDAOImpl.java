package org.iesbelen.dao;

import org.iesbelen.modelo.Alumno;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AlumnoDAOImpl implements AlumnoDAO {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    /**
     * Devuelve lista con todos los Alumnos.
     */
    @Override
    public List<Alumno> getAll() {

        List<Alumno> alumnoList = jdbcTemplate.query(
                "SELECT * FROM alumno",
                (rs, rowNum) -> new Alumno(rs.getLong("id"),
                        rs.getString("nombre"),
                        rs.getString("apellidos"),
                        rs.getInt("curso")
                )
        );

        return alumnoList;
    }
}