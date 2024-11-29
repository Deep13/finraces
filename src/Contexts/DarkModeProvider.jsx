import { createContext, useState } from "react";


export const DarkModeContext = createContext()
import useDarkMode from "../Utils/DarkMode";


const DarkModeProvider = ({ children }) => {
    const { darkModeEnabled, toggle } = useDarkMode() // centralized hook
    return (
        <DarkModeContext.Provider value={{ darkModeEnabled, toggle }}>
            {children}
        </DarkModeContext.Provider>
    )
}


export default DarkModeProvider
