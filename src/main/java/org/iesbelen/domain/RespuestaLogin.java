package org.iesbelen.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RespuestaLogin {
    private Object usuario;
    private String tipoUsuario;
    private String mensaje;
}
