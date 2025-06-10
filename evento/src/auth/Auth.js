import { jwtDecode } from "jwt-decode"

export const UserDecodeToken = (token) => {

    const decodificado = jwtDecode(token);

    return {
        idUsuario: decodificado.jti,
        token: token,
        tipoUsuaria: decodificado["Tipo do Usuario"]
        //emailUsuario:decodificado.email

    }
}


