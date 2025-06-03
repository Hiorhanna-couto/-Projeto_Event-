//import css:
import "./EventoAluno.css";
import Cometarios from "../../assets/img/comentario.png";
import Descricao from "../../assets/img/informacoes(2).png";
import Header from "../../components/hearder/Header";
import Footer from "../../components/footer/Footer";
import Modal from"../../components/modal/Modal";
// Atalho para criar o componente => rafc
import { useEffect, useState } from "react";

import { format, compareAsc } from "date-fns";

import api from "../../Services/services";

const EventoAluno = () => {
    const [listaEventos, setlistaEventos] = useState([])

    async function listarEventos() {
        try {
            const resposta = await api.get("Eventos")

            setlistaEventos(resposta.data);//


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        listarEventos();

    }, [])


    return (
        <>
     <Header/>
        <main className='main_lista_evento layout-grid' >
            <div className="Titulo">
                <h1>Eventos</h1>
                <hr />
            </div>
            <select name="" id="">
                <option value="" selected>Todos os eventos</option>

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
                        listaEventos.map((item) => (

                            <tr>
                                <td>{item.nomeEvento}</td>
                                <td>{format(item.dataEvento,"dd/MM/yy")}</td>
                                <td>{item.tiposEvento.tituloTipoEvento}</td>
                                <td>
                                    <button className="icon">
                                        <img src={Descricao} alt="" />
                                    </button>
                                </td>
                                <td>
                                    <button className="icon">
                                        <img src={Cometarios} alt="" />
                                    </button>
                                </td>
                                <td>
                                    <label className="switch">
                                        <input type="checkbox" />
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
       <Footer/>
       <Modal/>
       </>
    )
}

export default EventoAluno;
