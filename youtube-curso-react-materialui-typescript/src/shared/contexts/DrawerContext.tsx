import { createContext, useCallback, useContext, useState, ReactNode } from "react";

interface IDrawerContextData {
  toggleDrawerOpen: () => void;
  isDrawerOpen: boolean;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
    return useContext(DrawerContext);
}

export const DrawerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawerOpen = useCallback(() => {
        setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
    }, [])

    return (
        <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen}}>
            {children}
        </DrawerContext.Provider>
    );
}