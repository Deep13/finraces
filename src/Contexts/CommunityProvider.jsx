import React, { createContext, useContext, useState } from 'react';

// Create context
const CommunityContext = createContext();

// Provider
export const CommunityProvider = ({ children }) => {
  const [shareModal, setShareModal] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalImg, setModalImg] = useState('');

  return (
    <CommunityContext.Provider
      value={{
        shareModal,
        setShareModal,
        modalText,
        setModalText,
        modalImg,
        setModalImg,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
};

// Custom hook for easy access
export const useCommunity = () => useContext(CommunityContext);
