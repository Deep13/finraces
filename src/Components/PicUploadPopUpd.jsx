import { RxCross1 } from "react-icons/rx";
import { BsUpload } from "react-icons/bs";
import React, { useContext, useState } from "react";
import { uploadProfilePicture, updatePhoto } from "../Utils/api";
import { DarkModeContext } from "../Contexts/DarkModeProvider";
import { ColorRing } from "react-loader-spinner";

const PicUploadPopUpd = ({
  exit,
  setImageUrl,
  setImageIsLoading,
  isLoading,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { darkModeEnabled, setProfileImage } = useContext(DarkModeContext);
  const [showPopUp, setShowPopUp] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const maxSize = 3 * 1024 * 1024; // 2 MB in bytes

    if (files[0].size > maxSize) {
      alert("The selected file exceeds the maximum size of 2 MB.");
      return; // Exit the function if the file is too large
    }

    setSelectedFile(files[0]);
    console.log("Selected file:", files[0]); // You can process the file here
  };

  return (
    <div className="fixed w-full h-screen top-0 left-0 z-[100] bg-black bg-opacity-50 grid place-items-center">
      {showPopUp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            role="dialog"
            aria-modal="true"
            className="w-[30rem] h-[15rem] max-w-[90%] p-6 bg-white dark:bg-[#00387E] rounded-2xl flex flex-col items-center justify-center gap-6 shadow-lg"
          >
            {/* ✅ Success Check Icon */}

            {/* ✅ Main Message */}
            <p className="text-3xl font-semibold text-green-500">
              Updated Successfully
            </p>

            {/* ✅ Subtle Secondary Message */}
            <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
              Your changes have been saved successfully.
            </p>

            {/* ✅ Action Button */}
            <button
              onClick={() => {
                setShowPopUp(false);
                exit(false);
              }}
              className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 dark:bg-gradient-to-r from-[#005BFF] to-[#5B89FF] dark:hover:opacity-90 transition-all"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="py-8 px-12 rounded-lg min-h-[10rem] bg-white shadow-xl relative max-h-[18rem] flex flex-col gap-3 justify-center items-center w-[20rem] dark:bg-[#002763]">
        <button
          onClick={() => {
            exit(false);
          }}
          className="absolute top-4 right-4"
        >
          <RxCross1 size={20} color={darkModeEnabled ? "white" : "black"} />
        </button>
        {selectedFile && (
          <p className="mt-4 text-gray-700 text-center font-semibold dark:text-white">
            Selected file: {selectedFile.name}
          </p>
        )}
        <button
          onClick={() => {
            document.getElementById("fileInput")?.click();
          }}
          className="flex gap-4 border-2 p-3 font-semibold items-center rounded-lg border-black dark:border dark:border-white"
        >
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: "none" }} // Hide the input field
            onChange={handleFileChange}
          />
          <BsUpload size={30} color={darkModeEnabled ? "white" : "black"} />
          uplod Image
        </button>
        {selectedFile && (
          <button
            onClick={() => {
              if (selectedFile) {
                uploadProfilePicture(
                  selectedFile,
                  (data) => {
                    setImageIsLoading(true);
                    updatePhoto(
                      data.file.id,
                      (data) => {
                        // set the pic data here
                        setImageUrl(data?.photo?.path);
                        setProfileImage(data?.photo?.path);
                        let userData = JSON.parse(
                          atob(localStorage.getItem("fin_userDetails"))
                        );
                        userData.profilePic.path = data?.photo?.path;
                        localStorage.setItem(
                          "fin_userDetails",
                          btoa(JSON.stringify(userData))
                        );
                        setShowPopUp(true);
                      },
                      (error) => {
                        console.log(error);
                      }
                    );
                    // exit(false)
                    setTimeout(() => setImageIsLoading(false), 2500);
                  },
                  (error) => {
                    console.log("error", error);
                  }
                );
              }
            }}
            className="darktext-[#e4eaf0] bg-[#e4eaf0] dark:text-white dark:bg-gradient-to-r from-[#005bff] to-[#5b89ff] px-[2rem] py-[1rem] text-[0.7rem] md:text-[0.9rem] rounded-[8px] flex gap-2 items-center text-black font-semibold self-center"
          >
            {isLoading ? (
              <ColorRing
                visible={true}
                height="18"
                width="18"
                ariaLabel="color-ring-loading"
                // wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ffffff"]}
              />
            ) : (
              "Submit"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default PicUploadPopUpd;
