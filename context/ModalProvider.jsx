"use client"

import { useState, createContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [showDeleteModalWarning, setShowDeleteModalWarning] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");
    const [onDeleteCallback, setOnDeleteCallback] = useState(null);

    const closeModal = () => {
        setShowDeleteModalWarning(false);
        setModalTitle("");
        setModalText("");
        setOnDeleteCallback(null);
    };

    return(
        <ModalContext.Provider
            value={{
                showDeleteModalWarning,
                setShowDeleteModalWarning,
                modalTitle,
                setModalTitle,
                modalText,
                setModalText,
                onDeleteCallback,
                setOnDeleteCallback,
                closeModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContext;