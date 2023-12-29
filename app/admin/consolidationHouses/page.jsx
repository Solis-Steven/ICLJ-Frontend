"use client"
import { useState, useEffect } from 'react';
import { Pagination } from "./components/Pagination";
import { AddButton } from "@/components/AddButton";
import { ConsolidationList } from "./components/ConsolidationList";
import { getAllConsolidationHouses } from "./services/consolidationHouses.services";
import { deleteConsolidationHouseById } from "./services/consolidationHouses.services";

const page = () => {

  const [consolidations, setConsolidations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  let totalPages = 0;
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
}, []);

  const addConsolidation = () => {
    console.log("agregar");
  };
  const editConsolidation = (id) => {
    console.log('Editar');
  };
  const deleteConsolidation = async (id) => {
    try {
      // Llama a la función deleteConsolidationHouseById con el id proporcionado
      await deleteConsolidationHouseById(id);
  
      // La casa de consolidación se ha eliminado con éxito
      console.log(`Casa de consolidación con id ${id} eliminada con éxito.`);
      fetchConsolidationHouses();
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir durante la eliminación
      console.error(`Error al eliminar casa de consolidación con id ${id}:`, error.message);
    }
  };
  //Para la paginacion
  if(consolidations != undefined){
    totalPages = Math.ceil(consolidations.length / itemsPerPage);
  }
  //permite el manejo de la cantidad de filas por página
  const currentConsolidations = consolidations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <section className="w-full">
      <h1 className="font-bold text-2xl">Casas de Consolidación</h1>
      <div className="mt-8">
        <AddButton
          addElement={() => addConsolidation()}
          name="Agregar CDC"
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
      </section>
    </section>
  );
}

export default page;