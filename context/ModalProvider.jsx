"use client"

import { useState, createContext } from "react";

const ModalContext = createContext();

export const ModalProvider = ({children}) => {
    const [showDeleteModalWarning, setShowDeleteModalWarning] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalText, setModalText] = useState("");
    const [deleteFunction, setDeleteFunction] = useState(null);

    const closeModal = () => {
        setShowDeleteModalWarning(false);
        setModalTitle("");
        setModalText("");
    };

    const setDeleteModal = (title, text, onDelete) => {
        setModalTitle(title);
        setModalText(text);
        setDeleteFunction(() => onDelete);
        setShowDeleteModalWarning(true);
    };

    const deleteItem = async () => {
        if (deleteFunction) {
            try {
                await deleteFunction();
            } catch (error) {
                console.log(error)
            }
        } 
        closeModal();
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
                setDeleteFunction,
                closeModal,
                deleteItem,
                setDeleteModal
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}

export default ModalContext;