import "./Lista.css";
import Editar from "../../assets/img/Editar.png";
import Excluir from "../../assets/img/Deletar.png";

const Lista = (props) => {
  return (
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

              <th>Titulo</th>
              <th style={{ display: props.visibilidade }}>Genero</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          {/*tbody => e o corpo da tabela */}
          <tbody>
            {props.lista && props.lista.length > 0 ? (

              props.lista.map((item) => (

                <tr className="item_lista" key={item.idEvento}>
                  <td data-cell="Nome">{item.EventoNome}</td>

                  <td data-cell="Genero" style={{ display: props.visibilidade }}>
                       {item.genero.nome}
                  </td>

                  <td data-cell="Editar">
                    <button className="icon" onClick={() => props.funcEditar(item)}>
                      <img 
                      src={Editar} alt="Caneta"
                       />
                    </button>
                  </td>
                  <td data-cell="Excluir">
                    <button className="icon" onClick={() => props.funcExcluir(item[props.idEvento])}>
                      <img src={Excluir} alt="Lixeira" />
                    </button>

                  </td>
                </tr>
              ))
            ) :
              (
                <p>nenhum gênero foi encontrado.</p>
              )
            }
          </tbody>
        </table>
      </div>
    </section>

  )

}

export default Lista;
