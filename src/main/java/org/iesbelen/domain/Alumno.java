package org.iesbelen.domain;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

@Entity
@Table(name="alumno")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Alumno  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name="nombre")
    private String nombre;

    @Column(name="apellidos")
    private String apellidos;

    @Column(name="curso")
    private int curso;

    @Column(name="instrumento")
    private int idInstrumento;

    public static String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest;

        digest = MessageDigest.getInstance("SHA-256");
        byte[] encodedhash = digest.digest(
                password.getBytes(StandardCharsets.UTF_8));

        return bytesToHex(encodedhash);
    }

    private static String bytesToHex(byte[] byteHash) {
        StringBuilder hexString = new StringBuilder(2 * byteHash.length);
        for (int i = 0; i < byteHash.length; i++) {
            String hex = Integer.toHexString(0xff & byteHash[i]);
            if(hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }

        return hexString.toString();
    }
}
