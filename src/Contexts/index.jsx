import { createContext, useEffect } from "react";
import { useState } from "react";

export const GlobalContext = createContext('global_context')


// eslint-disable-next-line react/prop-types
const GlobalProvider = ({children}) => {

    const [createRaceState, setCreateRaceState] = useState(false)

    useEffect(() => {console.log('changed')},[createRaceState])
    return(
        <GlobalContext.Provider value={{
            createRaceState, 
            setCreateRaceState
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider