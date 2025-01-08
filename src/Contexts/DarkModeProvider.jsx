import { createContext, useEffect, useState } from "react";
import { getUser } from "../Utils/api";


export const DarkModeContext = createContext()
import useDarkMode from "../Utils/DarkMode";


const DarkModeProvider = ({ children }) => {

    // const profileImage = JSON.parse(atob(localStorage.getItem('userDetails')))
    const { darkModeEnabled, toggle } = useDarkMode() // centralized hook
    const [createRace, setCreateRace] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [profileImage, setProfileImage] = useState('')

    useEffect(() => {
        let thisUserDetails = JSON.parse(atob(localStorage.getItem('userDetails')))
        thisUserDetails && getUser(thisUserDetails.userId, (data) => {
            setProfileImage(data?.photo?.path)
        })
    }, [])
    return (
        <DarkModeContext.Provider
            value={{
                darkModeEnabled,
                toggle,
                createRace,
                setCreateRace,
                showLoginForm,
                setShowLoginForm,
                profileImage,
                setProfileImage
            }}>
            {children}
        </DarkModeContext.Provider>
    )
}


export default DarkModeProvider
