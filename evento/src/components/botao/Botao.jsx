import "./Botao.css"

const Botao = (props) => {
    return(
        <button  type="submit"  className="botao">{props.nomeDoBotao}</button>
    )
}

export default Botao;