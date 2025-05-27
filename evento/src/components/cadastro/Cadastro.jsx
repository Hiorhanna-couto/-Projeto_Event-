import Botao from "../botao/Botao";
import "./Cadastro.css";
import Imagem from "../imagem/Imagem";


const Cadastro = (props) => {
  return (
    <main className="layout_grid">
      <form  onSubmit={props.funcCadastro}    className="layout-grid form_cadastro">
        <div className="titulo">
          <h1>{props.tituloCadastro}</h1>
          <hr />
        </div>

        <section className=" layout-grid section_cadastro">
          <div className="campos_cadastro">
            <Imagem imagem={props.imagem} alt="Banner de Cadastro" />
          </div>


          <div className="campo_cad_nome">
            <label htmlFor="titulo"></label>
            <input type="text" name="nome" placeholder="Nome" />
            <input type="text" name="nome" placeholder="Data do evento" />
      
       <div className="campo_cad_genero" style={{ display: props.visibilidade }}>
            <input type="text" name="nome" placeholder="Tipo Evento"/>
            <label htmlFor="genero">Gênero </label>
            <select name="genero" id=""
            value={props.ValorSelect}
            onChange={(e)=>props.setValorInput(e.target.value)}
            >
              <option value="" disabled selected > Selecione</option>
              {props.lista && props.lista.length > 0 && props.lista.map((itemGenero) =>
              <option value={itemGenero.idGenero}>{itemGenero.nome}</option>
              
              )}
              

            </select>
          </div>
            <input type="text" name="nome" placeholder="Descrição" />
            <div>
              <Botao nomeDoBotao="Cadastrar" />
            </div>
          </div>



        </section>
      </form>
    </main>
  )
}
export default Cadastro;

