import Logo from "../../assets/img/logo1.svg";
import "./Login.css";
import Botao from "../../components/botao/Botao";

const Login = () => {
    return(
        <main className="main_login">
            <div className="banner"></div>
              <section className="section_login">
            <img src={Logo} alt="logo do Event" />
           <form action=" " className="form_login">
             <h1>Login</h1>
             <div className="campos_login"  >
             <div className="campo_input">
                    <label htmlFor="">Email:</label>
                    <input type="email" name="email"  placeholder="Username "/>
                </div>

                <div className="campo_input">
                    <label htmlFor="">Senha:</label>
                    <input type="password"  name="senha" placeholder="Password"/>
               </div >
                </div>
                
                <div className="recupera-senha">
                <a href="#">Esqueci a senha ?</a> {/* Link para a página de recuperação */}
                </div>
                <Botao nomeDoBotao="Login"/>
           </form>


          </section>
        </main>


    )


}
export default Login;