import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Create context
const CommunityContext = createContext();

// Provider
export const CommunityProvider = ({ children }) => {
  const [shareModal, setShareModal] = useState(false);
  const [modalText, setModalText] = useState("");
  const [modalImg, setModalImg] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  //only for testing
  const [test, setTest] = useState(false);

  const location = useLocation();

  useEffect(() => {
    // Reset selectedUser only when leaving /community
    if (!location.pathname.startsWith("/community")) {
      setSelectedUser(null);
    }
  }, [location.pathname]);

  return (
    <CommunityContext.Provider
      value={{
        shareModal,
        setShareModal,
        modalText,
        setModalText,
        modalImg,
        setModalImg,
        selectedUser,
        setSelectedUser,
        test,
        setTest,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

// Custom hook for easy access
export const useCommunity = () => useContext(CommunityContext);
