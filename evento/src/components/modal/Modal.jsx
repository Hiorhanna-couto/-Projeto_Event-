import ImaDeletar from "../../assets/img/Deletar.png"

const Modal = (props) => {
    return (
        <>
            <div className="modal-overla" onClick={props.fecharModal}></div>
            <div className="modal">
                <h1>{props.titulo}</h1>
                <div className="model_conteudo" >
                    {props.tipoModal === "descricaoEvento" ? (
                        <p>{props.descricao}</p>
                    ) : (
                        <>
                            {comentarios.map((item) => (
                                <div key={item.idComentarioEvento}>
                                    <strong>{item.usuario.nomeUsuario}</strong>
                                    <img src={ImaDeletar} alt="Deletar" />
                                    <p>{item.descrecao}</p>
                                    <hr />
                                </div>
                            ))}
                            <div>
                                <input type="text"
                                    placeholder="Escreva seu comentario..." />
                                <button>
                                    Cadastrar
                                </button>
                            </div>



                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Modal
