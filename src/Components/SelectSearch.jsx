import { BiChevronDown } from "react-icons/bi";
import { AiOutlineCheck } from "react-icons/ai";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import clsx from 'clsx';
import { useEffect, useState, useCallback, useContext } from 'react';
import { debounce } from "lodash";
import { searchStock } from "../Utils/api"; // Import your API function
import { DarkModeContext } from "../Contexts/DarkModeProvider";



export default function SelectSearch({
    handlePredicitonChange = () => { },
    index,
    setCurrentStock
}) {
    const [query, setQuery] = useState('');
    const [filteredPeople, setFilteredPeople] = useState([]);
    const [selected, setSelected] = useState(null);
    const { darkModeEnabled } = useContext(DarkModeContext)

    // Debounced query handler
    const updateFilteredPeople = useCallback(
        debounce(async (newQuery) => {
            if (newQuery.length > 2) {
                try {
                    const response = await searchStock(newQuery); // Replace with your actual API call
                    setFilteredPeople(response); // Adjust according to your API response structure
                } catch (error) {
                    console.error("Error fetching stocks:", error);
                    setFilteredPeople([]); // Handle error case
                }
            } else {
                setFilteredPeople([]); // Reset to default list if query is too short
            }
        }, 300), // Adjust the debounce duration as needed (300ms in this example)
        []
    );

    useEffect(() => {
        console.log(selected);
        if (selected) {
            handlePredicitonChange(index, 'stock_id', selected.id) // this will assign the id to selected entry of stock
            setCurrentStock(selected)
        }
    }, [selected])

    useEffect(() => {
        updateFilteredPeople(query);
        // Cleanup the debounce function on unmount
        return () => updateFilteredPeople.cancel();
    }, [query, updateFilteredPeople]);

    return (
        <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')}>
            <div className="relative">
                <ComboboxInput
                    autoComplete="off"
                    className={clsx(
                        'w-full rounded-lg border-none bg-white/5 py-3 px-[1.1rem] text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    displayValue={(person) => person?.name}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search Stock Here"
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <BiChevronDown color={darkModeEnabled ? 'white' : 'black'} size={18} />
                </ComboboxButton>
            </div>

            <ComboboxOptions
                anchor="bottom"
                transition
                className={clsx(
                    'w-[var(--input-width)] rounded-xl dark:border dark:border-white bg-white dark:bg-[#010b2c] p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
                    'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0 z-50 bg-white'
                )}
            >
                {filteredPeople?.map((stock) => (
                    <ComboboxOption
                        key={stock.id}
                        value={stock}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none dark:hover:bg-[#002763] dark:hover:text-white"
                    >
                        <AiOutlineCheck color={darkModeEnabled ? 'white' : 'black'} size={18} />
                        <div className="text-sm/6 text-black dark:text-white">{stock.name}</div>
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    );
}
