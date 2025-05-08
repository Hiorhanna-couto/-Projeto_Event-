import Cadastro from "../../components/cadastro/Cadastro";
import Header from "../../components/hearder/Header";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";

const CadastroTipoEvento = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="CADASTRO TIPO DE EVENTOS"
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
export default CadastroTipoEvento;