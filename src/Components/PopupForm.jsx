import { RxCross1 } from "react-icons/rx";
import React, { useContext } from 'react'
import Form from '../Sections/Auth/Form'
import { DarkModeContext } from "../Contexts/DarkModeProvider";

const PopupForm = ({
    closePopup = () => { }
}) => {
    const { darkModeEnabled, toggle } = useContext(DarkModeContext)
    return (
        <div className='fixed z-[100] backdrop-blur-md w-screen h-screen top-0 left-0 flex justify-center items-center overflow-auto'>
            <div className='bg-[#e4eaf4] relative rounded-lg shadow-xl dark:bg-[#002763] my-4'>
                <button className="absolute top-8 right-4" onClick={() => closePopup(false)}>
                    <RxCross1 size={20} color={darkModeEnabled ? 'white' : 'black'} />
                </button>
                <Form closeForm={closePopup} />
            </div>
        </div>
    )
}

export default PopupForm