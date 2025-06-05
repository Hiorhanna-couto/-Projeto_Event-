import { useEffect, useState } from "react";
import api from "../../Services/services";
import Swal from 'sweetalert2';

import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";
import imagemTipoEvento from "../../assets/img/banner1.png";
const CadastroTipoEvento = () => {

    const [tipoEvento, setTipoEvento] = useState("");
    const [listaTipoEvento, setListaTipoEvento] = useState([]);


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

        Toast.fire({
            icon: icone,
            title: mensagem
        });
    }

    async function cadastrarTipoEvento(e) {
        e.preventDefault();

        if (tipoEvento.trim() !== "") {
            try {
                await api.post("tiposEventos", { tituloTipoEvento: tipoEvento });
                alertar("success", "Cadastro realizado com sucesso!");
                setTipoEvento("");
                // listarTipoEvento();
            } catch (error) {
                alertar("error", "Erro! Entre em contato com o suporte.");
                console.error(error);
            }
        } else {
            alertar("error", "Preencha o campo!");
        }
    }

    async function listarTipoEvento() {
        try {
            const resposta = await api.get("tiposEventos");
            setListaTipoEvento(resposta.data);
        } catch (error) {
            console.error(error);
        }
    }

    async function excluirTipoEvento(idTipoEvento) {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: true
        });

        const result = await swalWithBootstrapButtons.fire({
            title: "Você tem certeza?",
            text: "Não será possível reverter!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar",
            reverseButtons: true
        });
        if (result.isConfirmed) {
            try {
                await api.delete(`tiposEventos/${idTipoEvento}`);
                swalWithBootstrapButtons.fire(
                    "Deletado!",
                    "O evento foi deletado com sucesso.",
                    "success"
                );
                listarTipoEvento();
            } catch (error) {
                console.log(error);
                Swal.fire("Erro!", "Não foi possível deletar o evento.", "error");
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
                "Cancelado",
                "O evento não foi deletado.",
                "error"
            );
        }
    }

    async function atualizarTipoEvento(tipoEvento) {
        console.log(tipoEvento);

        const { value: novoTipoEvento } = await Swal.fire({
            title: "Digite o novo gênero",
            input: "text",
            inputLabel: "Novo gênero",
            inputValue: tipoEvento.tituloTipoEvento,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return "O campo não pode estar vazio!";
                }
            }
        });

        if (novoTipoEvento) {
            try {
                console.log("Antigo:", tipoEvento.tituloTipoEvento);
                console.log("Novo:", novoTipoEvento);

                await api.put(`tiposEventos/${tipoEvento.idTipoEvento}`, {
                    tituloTipoEvento: novoTipoEvento
                });


                Swal.fire(`Evento modificado para: ${novoTipoEvento}`);
            } catch (error) {
                console.error("Erro ao atualizar:", error);
            }
        }
    }

    useEffect(() => {
        listarTipoEvento();
    }, []); 

    return (
        <>
            <Header />
            <main>
                <Cadastro
                    funcCadastro={cadastrarTipoEvento}
                    imagem={imagemTipoEvento}
                    tituloCadastro="CADASTRO TIPO DE EVENTOS"
                    placeholder="Titulo"
                    Titulonome="Titulo"
                    tabela={false}
                    visibilidade="none"
                    // visibilidadeData="none"
                    // visibilidade_Tevento="none"
                    visibilidade_instituicao="none"
                // visibilidade_descricao="none"


                />
                <Lista
                    tituloLista="LISTA TIPO DE EVENTOS"
                    lista={listaTipoEvento} 
                    chaveId="idTipoEvento" 
                    chaveNome="tituloTipoEvento" 
                    exibirData={false}
                    visibilidadeGenero="none"
                    funcExcluir={excluirTipoEvento}
                    funcEditar={atualizarTipoEvento}
                    funcDescricao="none"
                   
                    listaCadastroGenero="none"
                />


            </main>
            <Footer />
        </>


    )


}
export default CadastroTipoEvento;