import React, { useState, useContext, useCallback } from "react";
import Select from "react-select";
import { debounce } from "lodash";
import { searchStock, debounceStockSearchj } from "../Utils/api"; // Import your API function
import { DarkModeContext } from "../Contexts/DarkModeProvider";

export default function SelectSearch({
    handlePredicitonChange = () => { },
    index,
    setCurrentStock,
}) {
    const [options, setOptions] = useState([]); // Options for react-select
    const [loading, setLoading] = useState(false); // State for loading status
    const { darkModeEnabled } = useContext(DarkModeContext);

    // Function to fetch stock options
    const fetchStockOptions = useCallback(
        debounce(async (inputValue) => {
            if (inputValue.length > 2) {
                setLoading(true); // Set loading state to true before starting the request
                try {
                    await debounceStockSearchj(inputValue, (data) => {
                        setOptions(
                            data.map((stock) => ({
                                value: stock.id,
                                label: stock.name,
                            }))
                        );
                    }); // Call API to search stocks

                } catch (error) {
                    console.error("Error fetching stocks:", error);
                    setOptions([]); // Clear options on error
                } finally {
                    setLoading(false); // Reset loading state after the request
                }
            } else {
                setOptions([]); // Reset options if input is too short
            }
        }, 500), // Debounce to limit API calls
        []
    );

    const handleInputChange = (inputValue) => {
        fetchStockOptions(inputValue); // Fetch options dynamically
    };

    const handleChange = (selectedOption) => {
        handlePredicitonChange(index, "stock_id", selectedOption?.value); // Pass selected stock ID
        setCurrentStock(selectedOption); // Set the selected stock
    };

    // Custom styles for react-select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: darkModeEnabled ? "#010b2c" : "#f4f4f4", // Background color
            border: 'none',
            borderColor: state.isFocused
                ? (darkModeEnabled ? "#4f4f4f" : "#888") // Neutral border for focus
                : (darkModeEnabled ? "#4f4f4f" : "#ccc"), // Default border
            boxShadow: "none", // Remove any focus box shadow
            color: "#fff", // Text color
            "&:hover": {
                borderColor: darkModeEnabled ? "#4f4f4f" : "#888", // Subtle hover effect
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#fff", // Text color
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: darkModeEnabled ? "#010b2c" : "#2f2f2f", // Dropdown background
            color: "#fff", // Text in the dropdown
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused
                ? darkModeEnabled
                    ? "#002763" // Dark mode hover
                    : "#444" // Light mode hover
                : darkModeEnabled
                    ? "#010b2c"
                    : "#2f2f2f", // Default background
            color: "#fff", // Text color
            "&:hover": {
                backgroundColor: darkModeEnabled ? "#0046b8" : "#555", // Stronger hover effect
            },
        }),
        placeholder: (provided) => ({
            ...provided,
            color: "#aaa", // Placeholder text color
        }),
        input: (provided) => ({
            ...provided,
            color: "#fff", // Input text color
        }),
    };

    return (
        <Select
            styles={customStyles}
            options={options} // Dynamic options from API
            onInputChange={handleInputChange} // Fetch options on input change
            onChange={handleChange} // Handle stock selection
            placeholder="Search Stock Here"
            isClearable
            noOptionsMessage={() =>
                options.length === 0
                    ? loading
                        ? "Loading stocks..."
                        : "Start typing to search stocks..."
                    : "No stocks found"
            }
        />
    );
}