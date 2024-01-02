"use client"
import { useState, useEffect } from 'react';
import { Pagination } from "./components/Pagination";
import { AddButton } from "@/components/AddButton";
import { notifySuccess } from "@/utilities/notifySuccess";
import { ConsolidationList } from "./components/ConsolidationList";
import { getAllConsolidationHouses } from "./services/consolidationHouses.services";
import { deleteConsolidationHouseById } from "./services/consolidationHouses.services";
import { getConsolidationHouseById } from "./services/consolidationHouses.services";
import { AddModal } from "./components/AddModal";
import { EditModal } from "./components/EditModal";
const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [consolidations, setConsolidations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [consolidationHousesData, setConsolidationHousesData] = useState([]);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  let totalPages = 0;
  const viewModalAdd = () => {
    setIsOpen(!isOpen);
  };
  const viewModalEdit = () => {
    setIsOpenEdit(!isOpenEdit);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const fetchConsolidationHouses = async () => {
    try {
      const ConsolidationHousesData = await getAllConsolidationHouses();
      setConsolidations(ConsolidationHousesData);
    } catch (error) {
      console.error("Error fetching ConsolidationHouses:", error);
    }
  };
  useEffect(() => {
    fetchConsolidationHouses();
  }, [, consolidations]);

  const editConsolidation = async (id) => {
    try {
      viewModalEdit();
      const consolidationData = await getConsolidationHouseById(id);
      setConsolidationHousesData(consolidationData);
      // La casa de consolidación se ha eliminado con éxito
      console.log(`Casa de consolidación con id ${consolidationData.date} obtenida con éxito.`);
      const fecha = new Date(consolidationData.date);
      // Obtener la fecha en formato "YYYY-MM-DD"
      setDate(fecha.toISOString().split('T')[0]);
      // Obtener la hora en formato "HH:mm:ss"
      setTime(fecha.toISOString().split('T')[1].split('.')[0].slice(0, -3));
    } catch (error) {
      console.error(`Error al obtener casa de consolidación con id ${id}:`, error.message);
    }

  };
  const deleteConsolidation = async (id) => {
    try {
      // Llama a la función deleteConsolidationHouseById con el id proporcionado
      await deleteConsolidationHouseById(id);

      // La casa de consolidación se ha eliminado con éxito
      notifySuccess(`casa de consolidación eliminada exitosamente`);
      fetchConsolidationHouses();
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la eliminación
      console.error(`Error al eliminar casa de consolidación con id ${id}:`, error.message);
    }
  };
  //Para la paginacion
  if (consolidations != undefined) {
    totalPages = Math.ceil(consolidations.length / itemsPerPage);
  }
  //permite el manejo de la cantidad de filas por página
  const currentConsolidations = consolidations?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl">Casas de Consolidación</h1>
      <div className="mt-8">
        <AddButton
          addElement={() => viewModalAdd()}
          name="Agregar CDC"
        />
        <AddModal
          isOpen={isOpen}
          onClose={viewModalAdd}
        />
      </div>
      <section className="shadow-lg p-5 mt-10">
        {/* lista */}
        <ConsolidationList
          currentConsolidations={currentConsolidations}
          editConsolidation={editConsolidation}
          deleteConsolidation={deleteConsolidation}
        />
        {/* navegación */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
          pages={pages}
        />
        <EditModal
          isOpen={isOpenEdit}
          onClose={viewModalEdit}
          consolidationData={consolidationHousesData}
          dateT={date}
          timeT={time}
        />
      </section>
    </section>
  );
}

export default page;