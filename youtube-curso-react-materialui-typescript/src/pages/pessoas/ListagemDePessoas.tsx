import { useSearchParams } from "react-router-dom";
import { FerramentasDaListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";
import { useEffect, useMemo, useState } from "react";
import { IListagemPessoa, PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { useDebounce } from "../../shared/hooks";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export const ListagemDePessoas: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [pessoas, setPessoas] = useState<IListagemPessoa[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const busca = useMemo(() => {
        return searchParams.get('busca') || '';
    }, [searchParams]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            PessoasService.getAll(1, busca)
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
        
    }, [busca]);

    return (
        <LayoutBaseDePagina
            titulo="Listagem de Pessoas"
            barraDeFerramentas={
                <FerramentasDaListagem
                    mostrarInputBusca
                    textoBotaoNovo="Nova"
                    textoDaBusca={busca}
                    aoMudarTextoDaBusca={texto => setSearchParams({ busca: texto }, { replace: true })}
                />
            }
        >
            <TableContainer component={Paper} variant="outlined" sx={{ m: 1, width: 'auto' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell width={100}>Ações</TableCell>
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
                </Table>
            </TableContainer>
        </LayoutBaseDePagina>
    );
}