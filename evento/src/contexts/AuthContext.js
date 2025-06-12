//Importa funcoes do react necessarios para criar e usar contexto
import { createContext, useState, useContext, } from "react";//=>children

// Cria o contexto de autenticação, que vai permitir compartilhar dados entre componentes
const AuthContext = createContext();

/// Esse componente vai envolver a aplicação (ou parte dela) e fornecer os dados de autenticação para os filhos
//Provider = prover/dar
export const AuthProvider = ({ children }) => {
    //criar um estado que grarda os dados do usuario logado 
    const [usuario, setUsuario] = useState(null);

    return (
        //O  AutreContext.Provider permite que qualquer componente dentro dele acessa o `usuario`e`setUsuario`
        //faz com que qualquer componente que esteja dentro de <AuthContext> consiga acessar o valor {usuario,setUsuario} usuario o hook useAuth().
        <AuthContext.Provider value={{ usuario, setUsuario }}>
            {children}
        </AuthContext.Provider>

    );
};
//Esse hook personalizado facilita o acesso ao contexto dentro de qualquer componente
//Usar!!
export const useAuth = () => useContext(AuthContext);
