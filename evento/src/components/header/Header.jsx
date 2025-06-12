import  "./Header.css"
import Logo from "../../assets/img/logo1.svg"
import porta from"../../assets/img/portaAdmin.png"
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/*Ao clicar no link, redireciona para a tele de login  */}
                 <Link to="/"> 
                    <img src={Logo} alt="Logo do Event+" />
                 </Link> 

                <nav className="nav_header">

                    <Link className="link_header" to="/home">Home</Link>
                    <Link className="link_header" to="/CadastroTipoEvento">Eventos</Link>
                    <Link className="link_header" to="/CadastroTipoUsuario">Usuários</Link>
                    <Link className="link_header" to="/contatos">Contatos</Link>
                    <Link className="link_header" to="/administrador">Administrador</Link>
                    <img src={porta} alt=" A porta de adimi"/> 
                    
                </nav>

            </div>

        </header>
    )
}
export default Header;