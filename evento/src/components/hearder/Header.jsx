import  "./Header.css"
import Logo from "../../assets/img/logo1.svg"
import porta from"../../assets/img/portaAdmin.png"

const Header = () => {
    return (
        <header>
            <div className="layout_grid cabecalho">
                {/*Ao clicar no link, redireciona para a tele de login  */}
                {/* <Link to="/"> */}
                    <img src={Logo} alt="Logo do Event+" />
                {/* </Link> */}

                <nav className="nav_header">

                    <a className="link_header" to="/home">Home</a>
                    <a className="link_header" to="/eventos">Eventos</a>

                    <a className="link_header" to="/usuários">Usuários</a>
                    <a className="link_header" to="/contatos">Contatos</a>
                    <a className="link_header" to="/administrador">Administrador</a>

                    <img src={porta} alt=" A porta de adimi"/> 
                    
                </nav>

            </div>

        </header>
    )
}
export default Header;