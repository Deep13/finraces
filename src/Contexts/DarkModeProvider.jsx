import { createContext, useState } from "react";


export const DarkModeContext = createContext()
import useDarkMode from "../Utils/DarkMode";


const DarkModeProvider = ({ children }) => {
    const { darkModeEnabled, toggle } = useDarkMode() // centralized hook
    const [createRace, setCreateRace] = useState(false)
    return (
        <DarkModeContext.Provider
            value={{
                darkModeEnabled,
                toggle,
                createRace,
                setCreateRace
            }}>
            {children}
        </DarkModeContext.Provider>
    )
}


export default DarkModeProvider
