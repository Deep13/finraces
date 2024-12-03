import { RxCross1 } from "react-icons/rx";
import { BsUpload } from "react-icons/bs";
import React, { useState } from 'react'
import { uploadProfilePicture, updatePhoto } from "../Utils/api";

const PicUploadPopUpd = ({
    exit,
    setImageUrl,
    setImageIsLoading
}) => {


    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const maxSize = 3 * 1024 * 1024; // 2 MB in bytes

        if (files[0].size > maxSize) {
            alert("The selected file exceeds the maximum size of 2 MB.");
            return; // Exit the function if the file is too large
        }

        setSelectedFile(files[0]);
        console.log('Selected file:', files[0]); // You can process the file here
    };

    return (
        <div className='fixed w-full h-screen top-0 left-0 z-[100] bg-black bg-opacity-50 grid place-items-center'>
            <div className='py-8 px-12 rounded-lg bg-white shadow-xl relative h-[15rem] grid place-items-center w-[20rem]'>
                <button onClick={() => {
                    exit(false)
                }} className="absolute top-4 right-4">
                    <RxCross1 size={20} color="black" />
                </button>
                {
                    selectedFile &&
                    <p className="mt-4 text-gray-700 text-center font-semibold">Selected file: {selectedFile.name}</p>
                }
                <button
                    onClick={() => {
                        if (selectedFile) {
                            // upload the image
                            // alert('Image uploaded successfully')
                            if (selectedFile) {
                                uploadProfilePicture(selectedFile, (data) => {
                                    setImageIsLoading(true)
                                    updatePhoto(data.file.id, (data) => {
                                        // set the pic data here
                                        setImageUrl(data?.photo?.path)
                                    })
                                    exit(false)
                                    setTimeout(() => setImageIsLoading(false), 2500)
                                })
                            }
                        } else {
                            document.getElementById('fileInput')?.click()
                        }
                    }}
                    className="flex gap-4 border-2 p-3 font-semibold items-center rounded-lg border-black">
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }} // Hide the input field
                        onChange={handleFileChange}
                    />
                    <BsUpload size={30} color="black" />
                    uplod Image
                </button>
            </div>
        </div>
    )
}

export default PicUploadPopUpd