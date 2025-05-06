import "./Cadastro.css";
import Botao from"../botao/Botao";

const Cadastro = (props) =>{
  return(
    <section className="section_cadastro">
      <font action="" className="layout_grit form_cadastro ">
        <h1>CADASTRO TIPO DE EVENTOS</h1>
     
     <hr/>
       <div className="campos_cadastro">
    
       <div className="campo_cad_nome" > 
             <label htmlFor="nome"> </label>
             <input type="text" name="nome" placeholder={`Digite o nome do ${props.placeholder}`}/>
           </div>

       </div>




      </font>

    </section>

  )


}
export default Cadastro;