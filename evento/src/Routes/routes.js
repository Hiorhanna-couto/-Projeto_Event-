import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario"
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento"
import { useAuth } from "../contexts/AuthContext";
import ListagemEvento from "../pages/eventoAluno/EventoAluno";


const Privado = (props) => {
    const { usuario } = useAuth();
    //tke, idUsuario, tipoUsuario

    // Se nao estiver authenticado, mada para login
    if (!usuario) {
        return <Navigate to="/" />;
    }

    // Se o tipo do usuario nao for o permitido, bloqueia
    if (usuario.tipoUsuario !== props.tipoPermitido) {
        // ir para a tela de nao encontrado!
        return <Navigate to="/" />;
    }

    // Senao, renderiza o componente passado
    return <props.item />;
}


const Rotas = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Login />} exact />
                <Route path="/ListagemEvento" element={<Privado tipoPermitido="aluno" item={ListagemEvento} />} />
                <Route path="/CadastroEvento" element={< Privado tipoPermitido="admin" item={CadastroEvento} />} />
                <Route path="/CadastroTipoUsuario" element={<Privado tipoPermitido="admin" item={CadastroTipoUsuario} />} />
                <Route path="/CadastroTipoEvento" element={<Privado tipoPermitido="admin" item={CadastroTipoEvento} />} />

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;