import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from "@mui/material";
import { useDrawerContext } from "../../contexts";
import React from "react";
import { useMatch, useNavigate, useResolvedPath } from "react-router-dom";

interface IListItemLinkProps {
    to: string;
    icon: string;
    label: string;
    onClick?: (() => void);
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, onClick }) => {

    const navigate = useNavigate();
    const resolvedPath = useResolvedPath(to);
    const match = useMatch({ path: resolvedPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    }

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

export const MenuLateral: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down("sm"));

    const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

    return (
        <>
            <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
                <Box sx={{ width: theme.spacing(28), display: "flex", flexDirection: "column", height: "100%" }}>
                    <Box sx={{ width: "100%", height: theme.spacing(20), display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12) }} src="https://tse3.mm.bing.net/th/id/OIP.YFlTThU-YZq1G9SxU0cqcQHaIB?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" />
                    </Box>

                    <Divider />

                    <Box sx={{ flex: 1 }}>
                        <List component="nav">
                            {drawerOptions.map(drawerOption => (
                                <ListItemLink
                                    to={drawerOption.path}
                                    key={drawerOption.path}
                                    icon={drawerOption.icon}
                                    label={drawerOption.label}
                                    onClick={smDown ? toggleDrawerOpen : undefined}
                                />
                            ))}

                        </List>
                    </Box>
                </Box>
            </Drawer>

            <Box sx={{ height: "100vh", marginLeft: smDown ? 0 : theme.spacing(28) }}>
                {children}
            </Box>
        </>
    );
};