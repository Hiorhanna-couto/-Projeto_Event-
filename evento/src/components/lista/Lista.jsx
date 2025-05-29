import "./Lista.css";
import Lixo from "../../assets/img/Deletar.png";
import Caneta from "../../assets/img/Editar.png";
import Descricao from "../../assets/img/informacoes 1.png"

const Lista = (props) => {
  return (
    <section className="listagem">
      <h1>{props.tituloLista}</h1>
      <hr />

      <table className="tabela">
        <thead>
          <tr className="tabela_cabecalho">
            <th style={{ display: props.listaCadastroGenero }}>Nome</th>
            {props.exibirData && <th>Data do evento</th>}
            <th style={{ display: props.tituloCadastro }}>Título</th>
            {/* Exibe o cabeçalho do Gênero só se visibilidadeGenero for diferente de 'none' */}
            {props.visibilidadeGenero !== "none" && <th>Gênero</th>}
            <th>Editar</th>
            <th>Deletar</th>
            <th style={{ display: props.listaCadastroGenero }}>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {props.lista && props.lista.length > 0 ? (
            props.lista.map((item) => (
              <tr className="item_lista" key={item[props.chaveId]}>
                <td data-cell="Nome">{item[props.chaveNome]}</td>

                {props.exibirData && (
                  <td data-cell="Data">
                    {item[props.chaveData]?.split("T")[0]}
                  </td>
                )}

                {/* Exibe a célula do Gênero só se visibilidadeGenero for diferente de 'none' */}
                {props.visibilidadeGenero !== "none" && (
                  <td data-cell="Genero">
                    {item.genero?.nome || "-"}
                  </td>
                )}

                <td>
                  <img
                    className="icone_lista"
                    src={Caneta}
                    alt="ícone de editar"
                    style={{ cursor: "pointer" }}
                    onClick={() => props.funcEditar(item)}
                  />
                </td>

                <td>
                  <img
                    className="icone_lista"
                    src={Lixo}
                    alt="ícone de excluir"
                    style={{ cursor: "pointer" }}
                    onClick={() => props.funcExcluir(item[props.chaveId])}
                  />
                </td>

                {props.exibirSimboloDescricao && (
                  <td>
                    <img
                      className="icone_lista descricao"
                      src={Descricao}
                      alt="ícone de descricao"
                      style={{ cursor: "pointer" }}
                      onClick={() => props.funcDescricao(item[props.chaveId])}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td>Nenhum item encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default Lista;
