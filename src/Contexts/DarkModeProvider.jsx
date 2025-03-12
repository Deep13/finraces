import { createContext, useEffect, useRef, useState } from "react";
import { getUser } from "../Utils/api";


export const DarkModeContext = createContext()
import useDarkMode from "../Utils/DarkMode";


const DarkModeProvider = ({ children }) => {

    // const profileImage = JSON.parse(atob(localStorage.getItem('userDetails')))
    const { darkModeEnabled, toggle } = useDarkMode() // centralized hook
    const [createRace, setCreateRace] = useState(false)
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [profileImage, setProfileImage] = useState('')
    const [selectedStock,setSelectedStock] = useState({})
    const [report, setReport] = useState(false);
    const chartRef = useRef(null);

    useEffect(() => {
        let thisUserData = localStorage.getItem('userDetails')
        let thisUserDetails = thisUserData && JSON.parse(atob(thisUserData))
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
                setProfileImage,
                selectedStock,
                setSelectedStock,
                report,setReport,
                chartRef
            }}>
            {children}
        </DarkModeContext.Provider>
    )
}


export default DarkModeProvider
