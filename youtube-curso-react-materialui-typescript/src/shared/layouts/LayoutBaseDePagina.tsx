import { Box, Icon, IconButton, Theme, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../contexts";

interface ILayoutBaseDePaginaProps {
    titulo: string;
    barraDeFerramentas?: React.ReactNode;
    children?: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const theme = useTheme();
    const { toggleDrawerOpen } = useDrawerContext();

    return (
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", gap: 1}}>
            <Box sx={{ padding: 1, display: "flex", alignItems: "center", gap: 1, height: theme.spacing(smDown ? 6 : mdDown ? 8 : 12) }}>
                {smDown && (
                    <IconButton onClick={toggleDrawerOpen}>
                        <Icon>menu</Icon>
                    </IconButton>
                )}
                
                <Typography 
                    variant={smDown ? "h5" : mdDown ? "h4" : "h3"}
                    sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {titulo}
                </Typography>
            </Box>

            {barraDeFerramentas &&(
                <Box>
                    {barraDeFerramentas}
                </Box>
            )}
            
            <Box sx={{ flex: 1, overflow: "auto"}}>
                {children}
            </Box>
        </Box>
    );
};