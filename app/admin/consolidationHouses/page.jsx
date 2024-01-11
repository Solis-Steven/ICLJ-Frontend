"use client";
import { useState, useEffect } from "react";
import { AddButton } from "@/components/AddButton";
import { notifySuccess } from "@/utilities/notifySuccess";
import { ConsolidationList } from "./components/ConsolidationList";
import { getAllConsolidationHouses } from "./services/consolidationHouses.services";
import { deleteConsolidationHouseById } from "./services/consolidationHouses.services";
import { AddEditModal } from "./components/AddModal";
import { Search } from "@/components/Search";
import { CreateConsolidationHouse } from "./services/consolidationHouses.services";
import { UpdateConsolidationHouseById } from "./services/consolidationHouses.services";
const page = () => {
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    date: "",
    time: "",
    address: "",
  });
  const [consolidationHousesId, setConsolidationHousesId] = useState("");
  const [originalHouses, setOriginalHouses] = useState([]); //search component
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [consolidations, setConsolidations] = useState([]);

  const onClose = () => {
    setIsOpen(!isOpen);
  };

  const fetchConsolidationHouses = async () => {
    try {
      const data = await getAllConsolidationHouses({ page });
      setOriginalHouses((prevHouses) => [...prevHouses, ...data]);
      setConsolidations((prevHouses) => [...prevHouses, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching ConsolidationHouses:", error);
    }
  };
  useEffect(() => {
    fetchConsolidationHouses();
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
  const editConsolidation = async (consolidation) => {
    const { _id, name, leader, date, address } = consolidation;
    const fecha = new Date(date);
    // Obtener la fecha en formato "YYYY-MM-DD"
    const dateT = fecha.toISOString().split("T")[0];
    // Obtener la hora en formato "HH:mm:ss"
    const timeT = fecha.toISOString().split("T")[1].split(".")[0].slice(0, -3);
    setConsolidationHousesId(_id);
    setFormData({
      name,
      leader,
      date: dateT,
      time: timeT,
      address,
    });
    onClose();
  };
  const deleteConsolidation = async (id) => {
    try {
      // Llama a la función deleteConsolidationHouseById con el id proporcionado
      await deleteConsolidationHouseById(id);
      setConsolidations((prevConsolidations) =>
        prevConsolidations.filter((consolidation) => consolidation._id !== id)
      );
      setOriginalHouses((prevConsolidations) =>
        prevConsolidations.filter((consolidation) => consolidation._id !== id)
      );

      // La casa de consolidación se ha eliminado con éxito
      notifySuccess(`casa de consolidación eliminada exitosamente`);
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la eliminación
      console.error(
        `Error al eliminar casa de consolidación con id ${id}:`,
        error.message
      );
    }
  };
  //busqueda
  const handleSearch = (searchValue) => {
    if (searchValue === "") {
      setConsolidations(originalHouses);
      return;
    }

    const filteredHouses = originalHouses.filter((house) => {
      return house.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setConsolidations(filteredHouses);
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

    const combinedString = `${formData.date}T${formData.time}:00.000Z`;
    if (
      [
        formData.name,
        formData.leader,
        formData.date,
        formData.time,
        formData.address,
      ].includes("")
    ) {
      notifyError("Todos los campos son obligatorios");

      return;
    }
    if (consolidationHousesId !== "") {
      try {
        const data = await UpdateConsolidationHouseById(consolidationHousesId, {
          name: formData.name,
          leader: formData.leader,
          date: combinedString,
          address: formData.address,
        });
        if (data) {
          const ConsolidationHouseSaved = data;
  
          const updatedConsolidations = consolidations?.map(
            (consolidationState) =>
              consolidationState._id === ConsolidationHouseSaved._id
                ? ConsolidationHouseSaved
                : consolidationState
          );
          setConsolidations(updatedConsolidations);
          setOriginalHouses(updatedConsolidations); 
          notifySuccess(
            `casa de consolidación ${formData.name} editada exitosamente`
          );
          onClose();
          setFormData({
            name: "",
            leader: "",
            date: "",
            time: "",
            address: "",
          });
          setConsolidationHousesId("");
        }

        // La casa de consolidación se ha creado con éxito
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir durante la agregación
        console.log({ error });
      }
      return;
    }
    try {
      const data = await CreateConsolidationHouse({
        name: formData.name,
        leader: formData.leader,
        date: combinedString,
        address: formData.address,
      });
      //Agregar a la lista de consolidaciones
      const updatedConsolidations = [...consolidations, data];
      setConsolidations(updatedConsolidations);
      setOriginalHouses(updatedConsolidations);
      
      onClose();
      // La casa de consolidación se ha creado con éxito
      notifySuccess(
        `casa de consolidación ${formData.name} creada exitosamente`
      );
      setFormData({
        name: "",
        leader: "",
        date: "",
        time: "",
        address: "",
      });
      setConsolidationHousesId("");
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la agregación
      console.log({ error });
    }
  };
  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl mb-5">Casas de Consolidación</h1>
      <section className="flex gap-3 items-center">
        <AddButton addElement={() => onClose()} name="Agregar CDC" />
        <AddEditModal
          consolidationHousesId={consolidationHousesId}
          isOpen={isOpen}
          onClose={onClose}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          formData={formData}
          page={page}
          isActive={isActive}
        />
        <Search
          placeholder="Buscar Casa consolidación"
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
        <ConsolidationList
          currentConsolidations={consolidations}
          editConsolidation={editConsolidation}
          deleteConsolidation={deleteConsolidation}
        />
      </section>
    </section>
  );
};

export default page;
