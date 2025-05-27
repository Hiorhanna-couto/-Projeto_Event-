import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/hearder/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";
import imagemEvento from "../../assets/img/nana.png";


const CadastroEvento = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="CADASTRO DE EVENTO"
                     imagem ={imagemEvento}
                //   placeholder = "Titulo"
                //   visibilidade="none" 
                />
                <Lista
                    titulolista="LISTA TIPO DE EVENTOS"
                    visibilidade="none"
                />

            </main>
            <Footer />
        </>
    )
}
export default CadastroEvento;