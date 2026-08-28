import { useNavigate, useParams } from "react-router-dom";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { FerramentasDeDetalhe } from "../../shared/components";


export const DetalheDePessoas: React.FC = () => {

    const { id = 'nova' } = useParams<'id'>();
    const navigate = useNavigate();

    const handleSave = () => {
        // Implement save logic here
    }

    const handleDelete = () => {
        // Implement delete logic here
    }

    const handleSaveAndClose = () => {
        // Implement save and close logic here
    }

    return (
        <>
            <LayoutBaseDePagina 
                titulo='Detalhe da Pessoa'
                barraDeFerramentas={
                    <FerramentasDeDetalhe
                        textoBotaoNovo='Nova'
                        mostrarBotaoSalvarEFechar
                        mostrarBotaoNovo={id !== 'nova'}
                        mostrarBotaoApagar={id !== 'nova'}
                        aoClicarEmSalvar={() => handleSave()}
                        aoClicarEmSalvarEFechar={() => handleSaveAndClose()}
                        aoClicarEmApagar={() => handleDelete()}
                        aoClicarEmNovo={() => navigate('/pessoas/detalhe/nova')}
                        aoClicarEmVoltar={() => navigate('/pessoas')}
                    />
                }
            />
            <p>Detalhe da Pessoa {id}</p>
        </>
    );
}