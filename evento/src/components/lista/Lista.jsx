import "./Lista.css";
import Editar from"../../assets/img/Editar.png";
import Deletar from"../../assets/img/Deletar.png";

const Lista = (props) =>{
  return(
    <section className="layout_grit listagem">
    
        <h1>{props.titulolista}</h1>
         <hr /> 
 
          <div className="tabela">
           <table>
               {/*cabecalho da tabela */}
               <thead>
                 {/*tr => table row */}
                   <tr className="table_cabecalho">
                      {/*th => table head  => */}
                     
                      <th>Nome</th>
                      <th style={{display:props.visibilidade}}>Genero</th>
                      <th>Editar</th>
                      <th>Excluir</th>
                   </tr>
               </thead>
               {/*tbody => e o corpo da tabela */}
                 <tbody>
                   <tr className="item_lista">
                      <td data-cell="Nome">xxxxxxxxxxxx</td>
                    
                       <td data-cell="Genero" style={{display:props.visibilidade}}>Acao</td>
                       <td data-cell="Editar"><img src={Editar} alt="Caneta" /></td>
                       <td data-cell="Excluir"><img src={Deletar} alt="Lixeira" /></td>
                   </tr>
 
                 </tbody>
           </table>
          </div>
    </section>
 
  )
 
 }
 
 export default Lista;
      