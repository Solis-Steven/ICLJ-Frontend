"use client";
import React from "react";
import { useState, useEffect } from "react";
import { UploadFiles } from "./components/UploadFiles";
import { AddEditModal } from "./components/AddEditModal";
import { notifyError } from "@/utilities/notifyError";

const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    ref: "",
    visible: true,
  });
  const [multimediaId, setMultimediaId] = useState("");
  const [originalMultimedia, setOriginalMultimedia] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [multimedia, setMultimedia] = useState([]);
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    if(e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'video/mp4'){
      setFile(e.target.files[0]);
      onClose();
    }else{
      notifyError('El formato del archivo no es valido');
    }
  }
  const onClose = () => {
    setIsOpen(!isOpen);
  };
  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    onClose();
  };

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl mb-5">Multimedia</h1>
      <section className="flex gap-3 items-center">
        {/* button add */}
        {/* Modal */}
        <AddEditModal
          multimediaId={multimediaId}
          isOpen={isOpen}
          onClose={onClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          isLoading={isLoading}
        />
        {/* search */}
        <UploadFiles
        handleFileChange={handleFileChange} />
      </section>
      <section className="shadow-lg p-5 mt-10">{/* lista */}</section>
    </section>
  );
};

export default page;
