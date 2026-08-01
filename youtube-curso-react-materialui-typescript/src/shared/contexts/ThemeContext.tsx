import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "./../themes";

interface IThemeContextData {
  toggleTheme: () => void;
  themeName: 'light' | 'dark';
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback(() => {
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');
    }, [])

    const theme = useMemo(() => {
        if (themeName === 'light')
        {
            return LightTheme;
        }

        return DarkTheme;
    }, [themeName]);

    return (
        <ThemeContext.Provider value={{ themeName, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <Box sx={{ width: "100vw", height: "100vh", bgcolor: theme.palette.background.default }}>
                    {children}
                </Box>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}