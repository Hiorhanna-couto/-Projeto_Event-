//import css:
import "./EventoAluno.css";
import Cometarios from "../../assets/img/comentario.png";
import Descricao from "../../assets/img/informacoes(2).png";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Modal from "../../components/modal/Modal";
// Atalho para criar o componente => rafc
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import { format} from "date-fns";

import api from "../../Services/services";
import { useAuth } from "../../contexts/AuthContext";

const EventoAluno = () => {

    const [listaEventos, setlistaEventos] = useState([])
    //Modal
    const [tipoModal, setTipoModal] = useState("");//""descricaoEvento""ou "comentario"
    const [dadosModal, setDadosModal] = useState({});//decricao ou Idevento
    const [modalAberto, setModalAberto] = useState(false);
    //Filtro
    const [filtroData, setFiltroData] = useState(["todos"])


    const{usuario} = useAuth();
    // const [usuarioId, setUsuarioId] = useState("C5D7CA6E-FEAD-4F95-AF7D-EB0A779FD96E");

    async function listarEventos() {

        try {
            //pego todos os evento em geral
            const resposta = await api.get("eventos")
            console.log(resposta);
            const todosOsEventos = resposta.data

            const respostaPresenca = await api.get("PresencasEventos/ListarMinhas/" + usuario.IdUsuario)
            console.log(respostaPresenca);
            const minhasPresencas = respostaPresenca.data

            const eventosComPresencas = todosOsEventos.map((atualEvento) => {
                const presenca = minhasPresencas.find(p => p.idEvento === atualEvento.idEvento);

                return {
                    //As informacoes tanto de eventos quanto de eventos que possuem presenca
                    ...atualEvento,//mantem os dados originais do evento atual
                    possuiPresenca: presenca?.situacao === true,
                    idPresenca: presenca?.idPresencaEvento || null
                }

            })
            setlistaEventos(eventosComPresencas);//
            console.log(resposta.data`Informacoes de todos os evento:`);
            console.log(todosOsEventos);
            console.log(resposta.data`Informacoes de evento com presenca:`);
            console.log(minhasPresencas);
            console.log(resposta.data`Informacoes de todos os evento com presenca:`);
            console.log(eventosComPresencas);
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEventos();
console.log(usuario);

    }, [])

    function abrirModal(tipo, dados) {
        setModalAberto(true)
        //tipo modal
        setTipoModal(tipo)
        //dados
        setDadosModal(dados)
    }

    function fecharModal() {
        setModalAberto(false);
        //tipo modal
        setTipoModal({});
        //dados
        setDadosModal("");
    }
    async function manipularPresenca(idEvento, presenca, idPresenca) {
        try {
            if (presenca && idPresenca != "") {
                //atualizacao:situacao para FALSE
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: false });
                Swal.fire('Removido!', 'Sua presenca foi removida.', 'success');
            } else if (idPresenca != "") {
                //atualizacao:situacao para TRUE
                await api.put(`PresencasEventos/${idPresenca}`, { situacao: true });
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success');
            } else {
                //cadastrar um nova presenca
                await api.post("PresencasEventos", { situacao: true, IdUsuario: usuario.IdUsuario, idEvento: idEvento });
                Swal.fire('Confirmado!', 'Sua presenca foi confirmada.', 'success');
            }
            listarEventos();
        } catch (error) {
            console.log(error);
        }
    }

    function filtrarEventos() {
        const hoje = new Date();

        return listaEventos.filter(evento => {
            const dataEvento = new Date(evento.dataEvento);

            if (filtroData.includes("todos")) return true;
            if (filtroData.includes("futuros") && dataEvento > hoje) return true;
            if (filtroData.includes("passados") && dataEvento > hoje) return true;
            return false;
        });
    }
    return (
        <>
            <Header />
            <main className='main_lista_evento layout-grid' >
                <div className="Titulo">
                    <h1>Eventos</h1>
                    <hr />
                </div>

                <select onChange={(e) => setFiltroData([e.target.value])}>
                    <option value="Todos" selected>Todos os eventos</option>
                    <option value="futuros" selected>Somente Futuros</option>
                    <option value="passados" selected>Somente passados</option>
                </select>

                <table className='tabela_lista_eventos'>
                    <thead>
                        <tr className="th_lista_evento">
                            <th>Titulo</th>
                            <th>Data do Evento</th>
                            <th>Tipo Evento</th>
                            <th>Descricao</th>
                            <th>Comentarios</th>
                            <th>Participar</th>
                        </tr>

                    </thead>
                    <tbody>
                        {listaEventos.length > 0 ? (
                            filtrarEventos() && filtrarEventos().map((item) => (

                                <tr>
                                    <td>{item.nomeEvento}</td>
                                    <td>{format(item.dataEvento, "dd/MM/yy")}</td>
                                    <td>{item.tiposEvento.tituloTipoEvento}</td>
                                    <td>
                                        <button className="icon" onClick={() => abrirModal("descricaoEvento", { Descricao: item.descricao })}>
                                            <img src={Descricao} alt="" />
                                        </button>
                                    </td>
                                    <td>
                                        <button className="icon" onClick={() => abrirModal("Comentarios", { idEvento: item.idEvento })}>
                                            <img src={Cometarios} alt="" />
                                        </button>
                                    </td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={item.possuiPresenca}
                                                onChange={() =>
                                                    manipularPresenca(item.idEvento, item.possuiPresenca, item.idPresenca)

                                                }
                                            />
                                            <span className="slider"></span>
                                        </label>

                                    </td>
                                </tr>
                            ))

                        ) : (
                            <p>nao existe eventos Cadastro</p>
                        )}

                    </tbody>
                </table>
            </main>
            <Footer />
            {modalAberto && (

                <Modal

                    titulo={tipoModal === "descricaoEvento" ? "Descricao do Evento" : "Comentario"}
                    //estou verificando qual e o tipos de modal
                    tipoModel={tipoModal}

                    idEvento={dadosModal.idEvento}

                    descricao={dadosModal.Descricao}

                    fecharModal={fecharModal}

                />
            )}



        </>
    )
}

export default EventoAluno;
