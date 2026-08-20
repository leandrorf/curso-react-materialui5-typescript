import { Box, Button, Divider, Icon, Paper, Skeleton, useTheme } from "@mui/material";

interface IFerramentasDeDetalheProps {
    textoBotaoNovo?: string;

    mostrarBotaoNovo?: boolean;
    mostrarBotaoVoltar?: boolean;
    mostrarBotaoApagar?: boolean;
    mostrarBotaoSalvarEFechar?: boolean;
    mostrarBotaoSalvarEVoltar?: boolean;

    mostrarBotaoNovoCarregando?: boolean;
    mostrarBotaoVoltarCarregando?: boolean;
    mostrarBotaoApagarCarregando?: boolean;
    mostrarBotaoSalvarEFecharCarregando?: boolean;
    mostrarBotaoSalvarEVoltarCarregando?: boolean;

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
    mostrarBotaoSalvarEFechar = true,
    mostrarBotaoSalvarEVoltar = false,

    mostrarBotaoNovoCarregando = false,
    mostrarBotaoVoltarCarregando = false,
    mostrarBotaoApagarCarregando = false,
    mostrarBotaoSalvarEFecharCarregando = false,
    mostrarBotaoSalvarEVoltarCarregando = false,

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
            {(mostrarBotaoSalvarEFechar && !mostrarBotaoSalvarEFecharCarregando) && (
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

            {mostrarBotaoSalvarEFecharCarregando && (
                <Skeleton variant="rectangular" width={110} height={34} />
            )}

            {(mostrarBotaoSalvarEVoltar && !mostrarBotaoSalvarEVoltarCarregando) && (
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

            {mostrarBotaoSalvarEVoltarCarregando && (
                <Skeleton variant="rectangular" width={180} height={34} />
            )}

            {(mostrarBotaoApagar && !mostrarBotaoApagarCarregando) && (
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

            {mostrarBotaoApagarCarregando && (
                <Skeleton variant="rectangular" width={110} height={34} />
            )}
            
            {(mostrarBotaoNovo && !mostrarBotaoNovoCarregando) && (
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

            {mostrarBotaoNovoCarregando && (
                <Skeleton variant="rectangular" width={110} height={34} />
            )}

            {(mostrarBotaoVoltar && !mostrarBotaoVoltarCarregando) && (
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

            {mostrarBotaoVoltarCarregando && (
                <Skeleton variant="rectangular" width={110} height={60} />
            )}
        </Box>
    );
}