import Logo from "../../assets/img/logo1.svg";
import "./Login.css";
import Botao from "../../components/botao/Botao";
import Api from "../../Services/services"
import { useState } from "react";
import Swal from "sweetalert2";
import { UserDecodeToken } from "../../auth/Auth";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setemail] = useState("");
  const [senha, setsenha] = useState("");

  const navigate = useNavigate();

  async function realizarAutenticacao(e) {
    e.preventDefault();
    //  console.log(email,senha);

    //alert("Ebaaaa funcao foi chamada")
    const usuario = {
      email: email,
      senha: senha
    }
    if (senha.trim() != "" || email.trim() != "") {
      try {
        const resposta = await Api.post("Login", usuario)
        const token = resposta.data.token;
        // console.log(resposta.data.token); => isso vai dar a mesma coisa
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Os seu Cadastrado foi um suceso!",
          showConfirmButton: false,
          timer: 1500
        });
        if (token) {
          const tokerDecodificado = UserDecodeToken(token);
          secureLocalStorage.setItem("tokenLogin", JSON.stringify(tokerDecodificado));

          if (tokerDecodificado.tipoUsuaria === "aluno") {
            //redirecionar a tela de lista de evento(branco)

           navigate("/Evento")
          } else {
            //ele vai me encaminhar pra tela cadastro de evento (vermelha)
            navigate("/CadastroEvento")
          }
        }

      } catch (error) {

        Swal.fire({
          icon: "error",
          title: "Estar Errada",
          text: "Sua Senha OU Email istar Incorreta!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
        console.log(error);
        alert("Email ou senha ivalidos ! Para duvidas, entre em contato com o suporte.")
      }

    } else {
      Swal.fire("Preencha os campos vazios para realizar o login!");


    }
  }

  return (
    <main className="main_login">
      <div className="banner"></div>
      <section className="section_login">
        <img src={Logo} alt="logo do Event" />
        <form action=" " className="form_login" onSubmit={realizarAutenticacao}>
          <h1>Login</h1>
          <div className="campos_login"  >
            <div className="campo_input">
              <label htmlFor="">Email:</label>
              <input type="email" name="email" placeholder="E-mail "
                value={email}
                onChange={(e) => setemail(e.target.value)} />
            </div>

            <div className="campo_input">
              <label htmlFor="">Senha:</label>
              <input type="password" name="senha" placeholder="Password" value={senha}
                onChange={(e) => setsenha(e.target.value)} />
            </div >
          </div>

          <div className="recupera-senha">
            <a href="#">Esqueci a senha ?</a> {/* Link para a página de recuperação */}
          </div>
          <Botao nomeDoBotao="Login" />
        </form>


      </section>
      <></>
    </main>


  )


}
export default Login;