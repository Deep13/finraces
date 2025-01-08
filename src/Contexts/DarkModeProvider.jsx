import { createContext, useState } from "react";


export const DarkModeContext = createContext()
import useDarkMode from "../Utils/DarkMode";


const DarkModeProvider = ({ children }) => {
    const { darkModeEnabled, toggle } = useDarkMode() // centralized hook
    const [createRace, setCreateRace] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    return (
        <DarkModeContext.Provider
            value={{
                darkModeEnabled,
                toggle,
                createRace,
                setCreateRace,
                showLoginForm,
                setShowLoginForm
            }}>
            {children}
        </DarkModeContext.Provider>
    )
}


export default DarkModeProvider
