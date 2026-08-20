import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;

    aoClicarEmNovo?: () => void;
    aoClicarEmVoltar?: () => void;
    aoClicarEmApagar?: () => void;
    aoClicarEmSalvar?: () => void;
    aoClicarEmSalvarEVoltar?: () => void;
}

export const FerramentasDeDetalhe: React.FC<IFerramentasDeDetalheProps> = ({
    textoBotaoNovo = 'Novo',

    mostrarBotaoNovo = true,
    mostrarBotaoVoltar = true,
    mostrarBotaoApagar = true,
    mostrarBotaoSalvar = true,
    mostrarBotaoSalvarEVoltar = false,

    aoClicarEmNovo,
    aoClicarEmVoltar,
    aoClicarEmApagar,
    aoClicarEmSalvar,
    aoClicarEmSalvarEVoltar
}) => {
    const theme = useTheme();

    return (
        <Box 
            component={Paper} 
            sx={{
                height: theme.spacing(5),
                marginX: 1,
                padding: 1,
                paddingX: 2,
                display: 'flex',
                gap: 1,
                alignItems: 'center'
            }}
        >
            {mostrarBotaoSalvar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="contained"
                    onClick={aoClicarEmSalvar}
                    startIcon={<Icon>save</Icon>}
                >
                    Salvar
                </Button>
            )}

            {mostrarBotaoSalvarEVoltar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmSalvarEVoltar}
                    startIcon={<Icon>save</Icon>}
                >
                    Salvar e Voltar
                </Button>
            )}

            {mostrarBotaoApagar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmApagar}
                    endIcon={<Icon>delete</Icon>}
                >
                    Apagar
                </Button>
            )}
            
            {mostrarBotaoNovo && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmNovo}
                    endIcon={<Icon>add</Icon>}
                >
                    {textoBotaoNovo}
                </Button>
            )}            

            <Divider variant="middle" orientation="vertical" />

            {mostrarBotaoVoltar && (
                <Button
                    color="primary"
                    disableElevation
                    variant="outlined"
                    onClick={aoClicarEmVoltar}
                    endIcon={<Icon>arrow_back</Icon>}
                >
                    Voltar
                </Button>
            )}
        </Box>
    );
}