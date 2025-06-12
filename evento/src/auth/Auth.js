import { jwtDecode } from "jwt-decode";


export const UserDecodeToken = (token) => {

    const decodificado = jwtDecode(token);
    
    return{
        idUsuario: decodificado.jti,
        token: token,
        tipoUsuario: decodificado["Tipo do usuário"]
        //emailUsuario: decodificado.email
    }
}