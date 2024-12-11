import { AiOutlineCheck } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import clsx from 'clsx'
import { useContext, useState } from 'react'
import { DarkModeContext } from "../Contexts/DarkModeProvider";



export default function SelectDropdownStatic({
    data
}) {
    const { darkModeEnabled } = useContext(DarkModeContext)
    const [query, setQuery] = useState('')
    const [selected, setSelected] = useState(data[1])

    const filteredPeople =
        query === ''
            ? data
            : data.filter((item) => {
                return item.name.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <Combobox value={selected} onChange={(value) => setSelected(value)} onClose={() => setQuery('')} >
            <div className="relative">
                <ComboboxInput
                    className={clsx(
                        'w-full rounded-lg border-none bg-white/5 py-3 px-[1.1rem] text-sm/6 text-white',
                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                    )}
                    displayValue={(item) => item?.name}
                    onChange={(event) => setQuery(event.target.value)}
                />
                <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
                    <BiChevronDown size={18} color={darkModeEnabled ? 'white' : 'black'} />
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
                {filteredPeople.map((item) => (
                    <ComboboxOption
                        key={item.id}
                        value={item}
                        className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none dark:hover:bg-[#002763] dark:hover:text-white"
                    >
                        {/* <AiOutlineCheck size={18} /> */}
                        <div className="text-sm/6 text-black dark:text-white">{item.name}</div>
                    </ComboboxOption>
                ))}
            </ComboboxOptions>
        </Combobox>
    )
}
