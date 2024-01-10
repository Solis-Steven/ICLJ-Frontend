"use client";
import { useState, useEffect } from "react";
import { AddButton } from "@/components/AddButton";
import { notifySuccess } from "@/utilities/notifySuccess";
import { notifyError } from "@/utilities/notifyError";
import { getAllInfantil, CreateAnnouncement, deleteAnnouncementById, UpdateAnnouncementById } from "./services/infantil.services";
import { AnnouncementList } from "./components/AnnouncementList";
import { AddEditModal } from "./components/AddEditModal";
import { Search } from "@/components/Search";
const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    image: "",
  });
  const [anuncioId, setAnuncioId] = useState("");
const [originalAnuncios, setOriginalAnuncios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [anuncios, setAnuncios] = useState([]);

  const onClose = () => {
    setIsLoading(false);
    setIsOpen(!isOpen);
    setAnuncioId("");
    setFormData({
      name: "",
      description: "",
      date: "",
      time: "",
      image: "",
    });
  };

  const fetchAnnouncement = async () => {
    try {
      const data = await getAllInfantil({ page });
      setOriginalAnuncios((prevAnuncio) => [...prevAnuncio, ...data]);
      setAnuncios((prevAnuncio) => [...prevAnuncio, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Announcement:", error);
    }
  };
  useEffect(() => {
    fetchAnnouncement();
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
  //editar y eliminar
  const deleteRegularEvent = async (id) => {
    try {
        // Llama a la función deleteConsolidationHouseById con el id proporcionado
        await deleteAnnouncementById(id);
        setAnuncios((prevAnnouncement) =>
            prevAnnouncement.filter((announcement) => announcement._id !== id)
            );
        setOriginalAnuncios((prevAnnouncement) =>
            prevAnnouncement.filter((announcement) => announcement._id !== id)
            );
  
        // El anuncio  se ha eliminado con éxito
        notifySuccess(`Anuncio eliminado exitosamente`);
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la eliminación
        console.error(
          `Error al eliminar anuncio con id ${id}:`,
          error.message
        );
      }
  };
  const editRegularEvent = async (announcement) => {
    const { _id, name, description, date, image } = announcement;
    const fecha = new Date(date);
    // Obtener la fecha en formato "YYYY-MM-DD"
    const dateT = fecha.toISOString().split("T")[0];
    // Obtener la hora en formato "HH:mm:ss"
    const timeT = fecha.toISOString().split("T")[1].split(".")[0].slice(0, -3);
    
    setFormData({
      name,
      description,
      date: dateT,
      time: timeT,
      image,
    });
    setAnuncioId(_id);
    setIsOpen(!isOpen);
  };

  //busqueda
  const handleSearch = (searchValue) => {
    if (searchValue === "") {
      setAnuncios(originalAnuncios);
      return;
    }

    const filteredAnnouncements = originalAnuncios.filter((announcement) => {
        return announcement.name.toLowerCase().includes(searchValue.toLowerCase());
        });
    setAnuncios(filteredAnnouncements);
  };
  
  //modales funciones
  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const combinedString = `${formData.date}T${formData.time}:00.000Z`;
    if (
      [
        formData.name,
        formData.description,
        formData.date,
        formData.time,
        formData.image,
      ].includes("")
    ) {
      notifyError("Todos los campos son obligatorios");
      setIsLoading(false);

      return;
    }
    //editar
    if(anuncioId !== ""){
        try {
          const data = await UpdateAnnouncementById(anuncioId
            , {
            name: formData.name,
            description: formData.description,
            date: combinedString,
            image: formData.image,
          });
          if (data) {
            const AnnouncementSaved = data
            const updateAnnouncement = anuncios.map((announcement) =>
                announcement._id === AnnouncementSaved._id
                    ? AnnouncementSaved
                    : announcement
            );
            setAnuncios(updateAnnouncement);
            setOriginalAnuncios(updateAnnouncement);

            notifySuccess(
              `anuncio ${formData.name} editado exitosamente`
            );
            onClose();
            setAnuncioId("");
            setFormData({
              name: "",
              description: "",
              date: "",
              time: "",
              image: "",
            });
         
          }
  
          // el anuncio se ha creado con éxito
        } catch (error) {
          // Maneja cualquier error que pueda ocurrir durante la agregación
          console.log({ error });
        }finally{
          setIsLoading(false);
        }
        return;
      }
      //crear
    try {
      const data = await CreateAnnouncement({
        name: formData.name,
        description: formData.description,
        date: combinedString,
        image: formData.image,
      });
      //Agregar a la lista de anuncios
      const updateAnnouncement = [...anuncios, data];
      setAnuncios(updateAnnouncement);
      setOriginalAnuncios(updateAnnouncement);
      
      onClose();
      // El anuncio se ha creado con éxito
      notifySuccess(
        `Anuncio ${formData.name} creado exitosamente`
      );
      setFormData({
        name: "",
        description: "",
        date: "",
        time: "",
        image: "",
      });
      setAnuncioId("");
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la agregación
      console.log({ error });
    }
  };
  
  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl mb-5">Escuela biblica Infantil</h1>
      <section className="flex gap-3 items-center">
        <AddButton addElement={() => {onClose()}} name="Agregar Anuncio" />
        <AddEditModal
          anuncioId={anuncioId}
          isOpen={isOpen}
          onClose={onClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          isLoading={isLoading}
        />
        <Search
          placeholder="Buscar Anuncio"
          onChange={handleSearch}
        />
      </section>
      <section className="shadow-lg p-5 mt-10">
      {isLoading && (
          <div className="flex justify-center">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        )}
        {/* lista */}
        <AnnouncementList
          currentAnnouncements={anuncios}
          editAnnouncements={editRegularEvent}
          deleteAnnouncements={deleteRegularEvent}
        />
      </section>
    </section>
  );
};

export default page;
