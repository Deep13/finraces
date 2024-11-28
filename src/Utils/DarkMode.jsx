import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const useDarkMode = () => {

    const [darkModeEnabled, setDarkModeEnabled] = useState(false)


    useEffect(() => {
        if (darkModeEnabled) {
            document.body.classList.remove('dark')
            console.log('Dark Mode disabled');
        } else {
            document.body.classList.add('dark')
            console.log('Dark Mode enabled');
        }
    }, [darkModeEnabled])

    const toggle = () => {
        darkModeEnabled ? setDarkModeEnabled(false) : setDarkModeEnabled(true)
    }

    return {
        darkModeEnabled,
        toggle
    }

}

export default useDarkMode