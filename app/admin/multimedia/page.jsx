"use client";
import React from "react";
import { useState, useEffect } from "react";
import { UploadFiles } from "./components/UploadFiles";
import { AddEditModal } from "./components/AddEditModal";
import { notifyError } from "@/utilities/notifyError";
import { notifySuccess } from "@/utilities/notifySuccess";
import { CreateMultimedia, getAllmultimedia, deleteMultimediaById,UpdateMultimediaById } from "./services/multimedia.services";
import { uploadFile, deleteFile } from "@/config/firebase/config";
import { MultimediaList } from "./components/MultimediaList";
import { Search } from "@/components/Search";

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
  const [page, setPage] = useState(1);
  const [previousFile, setPreviousFile] = useState("");
  const [type, setType] = useState("");
  const fetchMultimedia = async () => {
    try {
      const data = await getAllmultimedia({ page });
      setOriginalMultimedia((prevMultimedia) => [...prevMultimedia, ...data]);
      setMultimedia((prevMultimedia) => [...prevMultimedia, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Multimedia:", error);
    }
  };
  useEffect(() => {
    fetchMultimedia();
  }, [page]);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleFileChange = (e) => {
    if (
      e.target.files[0].type === "image/png" ||
      e.target.files[0].type === "image/jpg" ||
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "video/mp4"
    ) {
      if(e.target.files[0].type === "video/mp4"){
        setType("video");
      }else{
        setType("image");
      }
      setFile(e.target.files[0]);
      if(multimediaId === ""){
        onClose();
      }
    } else {
      notifyError("El formato del archivo no es valido");
    }
  };
  const onClose = () => {
    setIsLoading(false);
    setMultimediaId("");
    setPreviousFile(""); //se agrego después
    setIsOpen(!isOpen);
    setFormData({
      name: "",
      ref: "",
      visible: true,
    });
  };
  //busqueda
  const handleSearch = (searchValue) => {
    if (searchValue === "") {
      setMultimedia(originalMultimedia);
      return;
    }

    const filteredMultiMedia = originalMultimedia.filter((multimedia) => {
      return multimedia.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setMultimedia(filteredMultiMedia);
  };

  //eliminar 
  const deleteMultimedia = async (multimedia) => {
    const { _id, ref } = multimedia;
    try {
      // Llama a la función deleteConsolidationHouseById con el id proporcionado
      await deleteMultimediaById(_id);
      await deleteFile(ref);
      setMultimedia((prevMultimedia) =>
        prevMultimedia.filter((multimedia) => multimedia._id !== _id)
      );
      setOriginalMultimedia((prevMultimedia) =>
        prevMultimedia.filter((multimedia) => multimedia._id !== _id)
      );

      // El anuncio  se ha eliminado con éxito
      notifySuccess(`archivo multimedia eliminado exitosamente`);
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la eliminación
      console.error(`Error al eliminar archivo multimedia con id ${id}:`, error.message);
    }
  };
  //editar
  const editMultimedia = async (multimedia) => {
    const { _id, name, ref, visible } = multimedia;
    setFormData({
      name,
      ref,
      visible,
    });
    setMultimediaId(_id);
    setPreviousFile(ref);
    setIsOpen(!isOpen);
  };
  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const fileUploadHandler = async () => {
    const files = file;
    if (previousFile) {
      console.log("entro 1")
      if(previousFile !== formData.ref){
        console.log(previousFile)
        console.log("entro 3")
        console.log(formData.ref)
        try {
          await deleteFile(previousFile);
        }
        catch (error) {
          console.log(error);
        }
      }else{
        return previousFile;
      }
    }
    try {
      console.log("entro 2")
      const fileRef = await uploadFile("multimedia",files);
      return fileRef;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    //necesito verificar si previusFile tiene algo 
    const referencia = await fileUploadHandler();
    if ([formData.name, referencia, formData.visible].includes("")) {
      notifyError("Todos los campos son obligatorios");
      setIsLoading(false);

      return;
    }
    //editar
    if (multimediaId !== "") {
      //la a la función que sube la imagen a Firebase Storage
      try {
        const data = await UpdateMultimediaById(multimediaId, {
          name: formData.name,
          ref: referencia,
          visible: formData.visible,
          type: type,
        });
        if (data) {
          const MultimediaSaved = data;
          const updateMultimedia = multimedia.map((multimedia) =>
            multimedia._id === MultimediaSaved._id ? MultimediaSaved : multimedia
          );
          setMultimedia(updateMultimedia);
          setOriginalMultimedia(updateMultimedia);

          notifySuccess(`archivo multimedia ${formData.name} editado exitosamente`);
          onClose();
          setMultimediaId("");
          setFormData({
            name: "",
            ref: "",
            visible: true,
          });
        }

        // el anuncio se ha creado con éxito
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la agregación
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
      return;
    }
    //crear
    try {
      // Subir la imagen a Firebase Storage
      //la a la función que sube la imagen a Firebase Storage
      const data = await CreateMultimedia({
        name: formData.name,
        ref: referencia,
        visible: formData.visible,
        type: type,
      });
      setIsLoading(false);
      onClose();
      const updatedMultimedia = [...multimedia, data];
      setMultimedia(updatedMultimedia);
      setOriginalMultimedia(updatedMultimedia);
      // El archivo multimedia se ha creado con éxito
      notifySuccess(`Archivo ${formData.name} creado exitosamente`);
      setFormData({
        name: "",
        ref: "",
        visible: true,
      });
      setMultimediaId("");
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la agregación
      console.log({ error });
    }
  };
  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl mb-5">Multimedia</h1>
      <Search placeholder="Buscar Archivo multimedia" onChange={handleSearch} />
      <section className="flex flex-col sm:flex-row gap-3 items-center">
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
          handleFileChange={handleFileChange}
        />
        {/* search */}
        {multimedia.filter(item => item.visible).length <= 4 ? (
          <UploadFiles handleFileChange={handleFileChange} />
        ) : (
          <div
            className="p-4 mt-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <span className="font-medium">Alerta de Información!</span> Para poder agregar más archivos deberá editar la visibilidad de los existentes.<span className="font-medium"> Solo puede haber 5 elementos visibles</span>.
          </div>
        )}
      </section>
      <section className="shadow-lg p-5 mt-10">{/* lista */}
      {multimedia?.length?
      (
        <MultimediaList
          currentMultimedia={multimedia}
          editMultimedia={editMultimedia}
          deleteMultimedia={deleteMultimedia}
        />
      ):(
        !isLoading && (
          <p className="text-center">
            A&uacute;n no hay archivos multimedia agregados
          </p>
        )
      )}
     
      </section>
    </section>
  );
};

export default page;
