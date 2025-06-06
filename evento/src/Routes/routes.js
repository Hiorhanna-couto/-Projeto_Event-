import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import CadastroTipoEvento from "../pages/cadastroTipoEvento/CadastroTipoEvento";
import CadastroEvento from "../pages/cadastroEvento/CadastroEvento"
import CadastroTipoUsuario from "../pages/cadastroTipoUsuario/CadastroTipoUsuario";
import Evento from "../pages/eventoAluno/EventoAluno";

const Rotas = () => {
    return(
        <BrowserRouter>
            <Routes>
                {/* http://localhost:3000/   => Login */}
                <Route path="/" element = {<Login/>} exact/>

                {/* http://localhost:3000/CadastroTipoEvento  => Cadastro de evento */}
                <Route path="/CadastroTipoEvento" element = {<CadastroTipoEvento/>}/> 

                {/* http://localhost:3000/CadastroTipoEvento  => Cadastro de evento */}
                <Route path="/CadastroEvento" element = {<CadastroEvento/>}/> 
                
                 {/* http://localhost:3000/CadastroTipoEvento  => Cadastro de evento */}
                <Route path="/CadastroTipoUsuario" element = {<CadastroTipoUsuario/>}/> 


                 {/* http://localhost:3000/CadastroTipoEvento  => Cadastro de evento */}
                <Route path="/Evento" element = {<Evento/>}/> 

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;