import React, { useState } from 'react';

const useDarkMode = () => {
    // Initialize state based on localStorage or default to false
    const storedMode = localStorage.getItem('darkMode') === 'true'; // Convert stored value to boolean
    const [darkModeEnabled, setDarkModeEnabled] = useState(storedMode);

    // Ensure the body class always matches the state during initialization
    document.body.classList.toggle('dark', darkModeEnabled);

    const toggle = () => {
        const newMode = !darkModeEnabled; // Toggle the state
        setDarkModeEnabled(newMode); // Update state
        localStorage.setItem('darkMode', newMode); // Save to localStorage

        // Update the body class based on the new state
        document.body.classList.toggle('dark', newMode);
    };

    return {
        darkModeEnabled,
        toggle,
    };
};

export default useDarkMode;
