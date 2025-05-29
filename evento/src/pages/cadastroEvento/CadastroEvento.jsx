import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from "sweetalert2";

import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/hearder/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";
import imagemEvento from "../../assets/img/nana.png";

const CadastroEvento = () => {
  // Estados dos inputs
  const [evento, setEvento] = useState("");
  const [listaEvento, setListaEvento] = useState([]);
  const [listaTipoEvento, setListaTipoEvento] = useState([]);
  const [instituicao, setInstituicao] = useState(
    "AD11F3D7-323B-4E4C-8F04-1FC170218B69"
  );
  const [tipoEvento, setTipoEvento] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [descricao, setDescricao] = useState("");

  // Função para alertas rápidos
  function alertar(icone, mensagem) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: icone,
      title: mensagem,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }

  // Cadastrar evento (envia todos os dados)
  async function cadastrarEvento(e) {
    e.preventDefault();

    // Validação básica
    if (!evento.trim()) {
      alertar("error", "Preencha o campo do nome do evento!");
      return;
    }
    if (!tipoEvento) {
      alertar("error", "Selecione o tipo do evento!");
      return;
    }
    if (!dataEvento) {
      alertar("error", "Selecione a data do evento!");
      return;
    }

    try {
      await api.post("evento", {
        nome: evento,
        idTipoEvento: tipoEvento,
        dataEvento: dataEvento,
        descricao: descricao,
        idInstituicao: instituicao,
      });

      alertar("success", "Evento cadastrado com sucesso!");
      setEvento("");
      setTipoEvento("");
      setDataEvento("");
      setDescricao("");
      listarEvento(); // Atualiza lista após cadastro
    } catch (error) {
      alertar("error", "Erro ao cadastrar evento. Contate o suporte!");
      console.error(error);
    }
  }

  // Listar eventos
  async function listarEvento() {
    try {
      const resposta = await api.get("evento");

      console.log("Eventos recebidos da API:", resposta.data);

      // Ajuste conforme a estrutura dos dados que vem da API:
      // Se for só resposta.data é um array, setar direto.
      // Se for algo como resposta.data.data, mude para resposta.data.data
      setListaEvento(resposta.data);
    } catch (error) {
      console.error("Erro ao listar eventos:", error);
    }
  }

  // Listar tipos de eventos para o select
  async function listarTipoEvento() {
    try {
      const resposta = await api.get("tiposEventos");
      setListaTipoEvento(resposta.data);
    } catch (error) {
      console.error(error);
    }
  }

  // Editar evento
  async function editarEvento(evento) {
    const { value: novoEvento } = await Swal.fire({
      title: "Modifique o nome do evento",
      input: "text",
      inputLabel: "Novo Evento",
      inputValue: evento.nome,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "O campo não pode estar vazio!";
        }
      },
    });

    if (novoEvento) {
      try {
        await api.put(`evento/${evento.idEvento}`, { nome: novoEvento });
        Swal.fire(`Evento modificado para: ${novoEvento}`);
        listarEvento();
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Excluir evento
  async function excluirEvento(idEvento) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });

    const result = await swalWithBootstrapButtons.fire({
      title: "Você tem certeza?",
      text: "Não será possível reverter!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, deletar!",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`evento/${idEvento}`);
        swalWithBootstrapButtons.fire(
          "Deletado!",
          "O evento foi deletado com sucesso.",
          "success"
        );
        listarEvento();
      } catch (error) {
        Swal.fire("Erro!", "Não foi possível deletar o evento.", "error");
        console.error(error);
      }
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        "Cancelado",
        "O evento não foi deletado.",
        "error"
      );
    }
  }

  // Descrição do evento (popup)
  function descricaoEvento(item) {
    Swal.fire({
      title: item.nome,
      icon: "info",
      html: `<p>${item.descricao || "Sem descrição disponível."}</p><p>Data: ${item.dataEvento || "Não informado"}</p>`,
      confirmButtonText: "Fechar",
    });
  }

  useEffect(() => {
    listarEvento();
    listarTipoEvento();
  }, []);

  return (
    <>
      <Header />
      <main>
        <Cadastro
          tabela={true} // importante para exibir os campos extras
          imagem={imagemEvento}
          tituloCadastro="Cadastro de Evento"
          valor={evento}
          onChange={(e) => setEvento(e.target.value)}
          onSubmit={cadastrarEvento}
          Titulonome="Nome do Evento"
          // Inputs extras
          valorData={dataEvento}
          onChangeData={(e) => setDataEvento(e.target.value)}
          valorTipoEvento={tipoEvento}
          setValorTipoEvento={setTipoEvento}
          valorInstituicao={instituicao}
          setValorInstituicao={setInstituicao}
          valorInputDescricao={descricao}
          setValorInputDescricao={setDescricao}
          visibilidade_instituicao="block"
          visibilidade_tp_evento="block"
          visibilidade_descricao="block"
          lista={listaTipoEvento}
        />
        <Lista
          tituloLista="LISTA DE EVENTOS"
          lista={listaEvento}
          chaveId="idEvento"
          chaveNome="nome"
          exibirData={true}
          visibilidadeGenero="none"
          funcExcluir={excluirEvento}
          funcEditar={editarEvento}
          funcDescricao={descricaoEvento}
          exibirSimboloDescricao={true}
          listaCadastroGenero={true}
        />
      </main>
      <Footer />
    </>
  );
};

export default CadastroEvento;
