import Header from "../../components/hearder/Header";
import Cadastro from "../../components/cadastro/Cadastro";
import Footer from "../../components/footer/Footer";
import Lista from "../../components/lista/Lista";

const CadastroTipoUsuario = () => {
    return (
        <>
            <Header />
            <main>
                <Cadastro
                    tituloCadastro="CADASTRO TIPO DE USUARIO"



                />
                <Lista

                    titulolista="LISTA TIPO DE USUARIO"
                    visibilidade="none"

                />
            </main>
            <Footer/>

        </>

    )

}
export default CadastroTipoUsuario;