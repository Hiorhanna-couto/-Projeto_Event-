import Botao from "../botao/Botao";
import "./Cadastro.css";
import banner1 from "../../assets/img/banner1.png"
//   import nana from "../../assets/img/nana.png"
//  import usuario from "../../assets/img/usuario.png"

const Cadastro = (props) => {
  return (

    <section className="section_cadastro">
      <form action="" className="layout-grid form_cadastro">
        <h1>{props.tituloCadastro}</h1>
        <hr />

        <div className="campos_cadastro">
          <div className="banner_cadastro" style={{ display: props.novo }}><img src={banner1} alt="Imagem" /></div>
          {/* <div className="banner_cadastro"style={{display:props.novo1}}><img src={nana} alt="Imagem" /></div>
                  <div className="banner_cadastro" style={{display:props.novo2}} ><img src={usuario} alt="Imagem" /></div> */}

          <div className="campo_cad_nome">
            <label htmlFor="titulo"></label>
            <input type="text" name="nome" placeholder="Titulo" />
            <div>
              <Botao nomeDoBotao="Cadastrar" />
            </div>
          </div>

        </div>

      </form>
    </section>

  )
}
export default Cadastro;