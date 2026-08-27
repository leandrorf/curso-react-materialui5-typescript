import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Box, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material";
import { Environment } from "../../shared/environment";

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [pessoas, setPessoas] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    const pagina = useMemo(() => {
        return Number(searchParams.get('pagina')) || 1;
    }, [searchParams]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(pagina, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        console.log(result);

                        setPessoas(result.data);
                        setTotalCount(result.totalCount);
                    }
                });
        });

    }, [busca, pagina]);

    return (
        <LayoutBaseDePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo="Nova"
                    textoDaBusca={busca}
                    aoMudarTextoDaBusca={
                        texto => setSearchParams(
                            { busca: texto, pagina: '1' },
                            { replace: true }
                        )}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ações</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {pessoas.map((pessoa) => (
                            <TableRow key={pessoa.id}>
                                <TableCell width={100}>Ações</TableCell>
                                <TableCell>{pessoa.nomeCompleto}</TableCell>
                                <TableCell>{pessoa.email}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Environment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>

                        {isLoading && (
                            <TableRow>
                                <TableCell colSpan={3} sx={{ position: 'relative' }}>
                                    <LinearProgress variant="indeterminate" />
                                </TableCell>
                            </TableRow>
                        )}

                    </TableFooter>
                </Table>
            </TableContainer>

            {(totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS) && (
                <Box sx={{ display: 'flex', justifyContent: 'center', m: 1 }}>
                    <Pagination
                        page={pagina}
                        count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                        onChange={(_, newPage) => setSearchParams({ busca, pagina: newPage.toString() }, { replace: true })}
                    />
                </Box>
            )}
        </LayoutBaseDePagina>
    );
}