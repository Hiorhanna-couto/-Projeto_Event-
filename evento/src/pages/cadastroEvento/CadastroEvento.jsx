import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Lista from "../../components/lista/Lista";
import imagemEvento from "../../assets/img/nana.png";
import api from "../../Services/services";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const CadastroEvento = () => {
   const [evento, setEvento] = useState("");
    const [listaEvento, setListaEvento] = useState([]);
    const [listaTipoEvento, setListaTipoEvento] = useState([]);
    const [instituicao, setInstituicao] = useState(
        "AD11F3D7-323B-4E4C-8F04-1FC170218B69"
    );
    const [tipoEvento, setTipoEvento] = useState("");
    const [dataEvento, setDataEvento] = useState("");
    const [descricao, setDescricao] = useState("");


    function alertar(icone, mensagem) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });

        Toast.fire({ icon: icone, title: mensagem });
    }

    async function cadastrarEvento(e) {
        e.preventDefault();
        if (evento.trim() !== "") {
            try {
                await api.post("Eventos", {
                    nomeEvento: evento,
                    dataEvento: dataEvento,
                    descricao: descricao,
                    idTipoEvento: tipoEvento,
                    idInstituicao: instituicao
                });
                alertar("success", "Sucesso! Cadastro realizado com sucesso!");
                setEvento("");
                setDataEvento("");
                setTipoEvento("");
                setDescricao("");
                setInstituicao("");
                listarEvento();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte!");
                console.log(error);
            }
        } else {
            alertar("error", "Erro! Preencha os campos");
        }
    }

    async function listarEvento() {
        try {
            const resposta = await api.get("Eventos");
            setListaEvento(resposta.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("TiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function excluirEvento(idEvento) {
        const result = await Swal.fire({
            title: "Você tem certeza?",
            text: "Não será possível reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`eventos/${idEvento}`);
                Swal.fire("Deletado!", "O evento foi deletado com sucesso.", "success");
                listarEvento();
            } catch (error) {
                console.error(error);
                Swal.fire("Erro!", "Não foi possível deletar o evento.", "error");
            }
        }
    }

   async function atualizarEvento(evento) {
  try {
    const tiposOptions = listaTipoEvento
      .map(tipo => `<option value="${tipo.idTipoEvento}" ${tipo.idTipoEvento === evento.idTipoEvento ? 'selected' : ''}>${tipo.tituloTipoEvento}</option>`)
      .join('');

    const { value } = await Swal.fire({
      title: "Editar Tipo de Evento",
      html: `
        <input id="campo1" class="swal2-input" placeholder="Título" value="${evento.nomeEvento || ''}">
        <input id="campo2" class="swal2-input" type="date" value="${evento.dataEvento?.substring(0, 10) || ''}">
        <select id="campo3" class="swal2-select">${tiposOptions}</select>
        <input id="campo4" class="swal2-input" placeholder="Categoria" value="${evento.descricao || ''}">
      `,
      showCancelButton: true,
      confirmButtonText: "Salvar",
      cancelButtonText: "Cancelar",
      focusConfirm: false,
      preConfirm: () => {
        const campo1 = document.getElementById("campo1").value;
        const campo2 = document.getElementById("campo2").value;
        const campo3 = document.getElementById("campo3").value;
        const campo4 = document.getElementById("campo4").value;

        if (!campo1 || !campo2 || !campo3 || !campo4) {
          Swal.showValidationMessage("Preencha todos os campos.");
          return false;
        }

        return { campo1, campo2, campo3, campo4 };
      }
    });

    if (!value) {
      console.log("Edição cancelada pelo usuário.");
      return;
    }

    console.log("Dados para atualizar:", value);

    await api.put(`eventos/${evento.idEvento}`, {
      nomeEvento: value.campo1,
      dataEvento: value.campo2,
      idTipoEvento: value.campo3,  
      descricao: value.campo4,
    });

    console.log("Evento atualizado com sucesso!");
    Swal.fire("Atualizado!", "Dados salvos com sucesso.", "success");
    listarEvento();

  } catch (error) {
    console.log("Erro ao atualizar evento:", error);
    Swal.fire("Erro!", "Não foi possível atualizar.", "error");
  }
}

    async function DescreverEvento(idEvento) {
        try {
            const resposta = await api.get(`eventos/${idEvento}`);
            const descricao = resposta.data.descricao || "Sem descrição disponível.";
            Swal.fire({ title: "Descrição do Evento", text: descricao, icon: "info" });
        } catch (error) {
            console.error("Erro ao buscar descrição:", error);
            Swal.fire("Erro!", "Não foi possível carregar a descrição.", "error");
        }
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
                    tituloCadastro="Cadastro de Evento"
                    exibirListaCadastro={true}
                    imagem={imagemEvento}
                    valor={evento}
                    visibilidadegenero="none"
                    onChange={(e) => setEvento(e.target.value)}
                    valorData={dataEvento}
                    onChangeData={(e) => setDataEvento(e.target.value)}
                    onSubmit={cadastrarEvento}
                    lista={listaTipoEvento}
                    valorInputDescricao={descricao}
                    setValorInputDescricao={setDescricao}
                    valorTipoEvento={tipoEvento}
                    setValorTipoEvento={setTipoEvento}
                    valorInstituicao={instituicao}
                    setValorInstituicao={setInstituicao}

                />
                <Lista
                    tituloTipoEvento={true}
                    exibirTipoEvento={true}
                    tituloLista="Eventos"
                    lista={listaEvento}
                    funcEditar={atualizarEvento}
                    funcDeletar={excluirEvento}
                    funcDescricao={DescreverEvento}
                    exibirData={true}
                    exibirSimboloDescricao={true}
                    visibilidadeGenero="none"
                    tituloCadastro="none"
                    visibilidadeTipoEvento="table-cell"
                    listaCadastroGenero="table-cell"
                    chaveId="idEvento"
                    chaveNome="nomeEvento"
                    chaveData="dataEvento"
                    chaveTipoEvento="tiposEvento"  // <-- atenção aqui: confira o nome da propriedade vindo da API
                />


            </main>
            <Footer />
        </>
    );
};

export default CadastroEvento;