"use client";
import { useState, useEffect } from "react";
import { AddButton } from "@/components/AddButton";
import { notifySuccess } from "@/utilities/notifySuccess";
import { AddEditModal } from "./components/AddEditModal";
import { EventFixedList } from "./components/list";
import { getAllRegularEvents } from "./services/regularEvents.services";
import {CreateRegularEvent} from "./services/regularEvents.services";
import {deleteRegularEventById, UpdateRegularEventById} from "./services/regularEvents.services";
import { notifyError } from "@/utilities/notifyError";
import { Search } from "@/components/Search";
const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    manager: "",
    date: "",
    time: "",
    visible: true,
  });
  const [eventFixed, setEventFixed] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [originalEventFixed, setOriginalEventFixed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [eventFixedId, setEventFixedId] = useState("");

  const fetchRegularEvents = async () => {
    try {
      const data = await getAllRegularEvents({ page });
      setEventFixed((prevEvent) => [...prevEvent, ...data]);
      setOriginalEventFixed((prevEvent) => [...prevEvent, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching RegularEvents:", error);
    }
  };
  useEffect(() => {
    fetchRegularEvents();
  }, [page]);

  const onClose = () => {
    setIsOpen(!isOpen);
  };
  const handleInputChange = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  const deleteRegularEvent = async (id) => {
    try {
      await deleteRegularEventById(id);
      setEventFixed((prevEventFixed) =>
        prevEventFixed.filter((eventFixed) => eventFixed._id !== id)
      );
      setOriginalEventFixed((prevEventFixed) =>
        prevEventFixed.filter((eventFixed) => eventFixed._id !== id)
      );

      // La evento fijo se ha eliminado con éxito
      notifySuccess(`Evento fijo eliminado exitosamente`);
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la eliminación
      console.error(
        `Error al eliminar evento fijo con id ${id}:`,
        error.message
      );
    }
  };
  const editRegularEvent = async (regularEvent) => {
    const { _id, name, manager, date, visible } = regularEvent;
    const fecha = new Date(date);
    // Obtener la fecha en formato "YYYY-MM-DD"
    const dateT = fecha.toISOString().split("T")[0];
    // Obtener la hora en formato "HH:mm:ss"
    const timeT = fecha.toISOString().split("T")[1].split(".")[0].slice(0, -3);
    setEventFixedId(_id);
    setFormData({
      name,
      manager,
      date: dateT,
      time: timeT,
      visible,
    });
    onClose();
  };
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
  const handleSearch = (searchValue) => {
    if (searchValue === "") {
      setEventFixed(originalEventFixed);
      return;
    }

    const filteredEvents = originalEventFixed.filter((eventFixed) => {
      return eventFixed.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setEventFixed(filteredEvents);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedString = `${formData.date}T${formData.time}:00.000Z`;
    if (
      [
        formData.name,
        formData.manager,
        formData.date,
        formData.time,
        formData.visible,
      ].includes("")
    ) {
      notifyError("Todos los campos son obligatorios");

      return;
    }
    if(eventFixedId !== ""){
      try {
        const data = await UpdateRegularEventById(eventFixedId
          , {
          name: formData.name,
          manager: formData.manager,
          date: combinedString,
          visible: formData.visible,
        });
        if (data) {
          const RegularEventSaved = data;
          const updatedEventFixed = eventFixed?.map(
            (eventFixedState) =>
              eventFixedState._id === RegularEventSaved._id
                ? RegularEventSaved
                : eventFixedState
          );
          setEventFixed(updatedEventFixed);
          setOriginalEventFixed(updatedEventFixed);
          notifySuccess(
            `evento fijo ${formData.name} editado exitosamente`
          );
          onClose();
          setFormData({
            name: "",
            manager: "",
            date: "",
            time: "",
            visible: true,
          });
          setEventFixedId("");
        }

        // La casa de consolidación se ha creado con éxito
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la agregación
        console.log({ error });
      }
      return;
    }
    try {

      const data = await CreateRegularEvent({
        name: formData.name,
        manager: formData.manager,
        date: combinedString,
        visible: formData.visible,
      });
      onClose();
      //Agregar a la lista de consolidaciones
      const updatedEventFixed = [...eventFixed, data];
      setEventFixed(updatedEventFixed);
      setOriginalHouses(updatedEventFixed);
      // La casa de consolidación se ha creado con éxito
      notifySuccess(
        `Evento fijo ${formData.name} creado exitosamente`
      );
      setFormData({
        name: "",
        manager: "",
        date: "",
        time: "",
        visible: true,
      });
      setEventFixedId("");
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la agregación
      console.log({ error });
    }
  };
  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl mb-5">Eventos Fijos</h1>
      <section className="flex gap-3 items-center">
        <AddButton addElement={() => onClose()} name="Agregar Evento Fijo" />
        <AddEditModal
          EventFixedId={eventFixedId}
          isOpen={isOpen}
          onClose={onClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          page={page}
          isActive={true}
        />
        <Search placeholder="Buscar Evento Fijo" onChange={handleSearch} />
      </section>
      <section className="shadow-lg p-5 mt-10">
        {/* lista */}
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
        <EventFixedList
          currentEventFixed={eventFixed}
          editEventFixed={editRegularEvent}
          deleteEventFixed={deleteRegularEvent}
        />
      </section>
    </section>
  );
};

export default page;
