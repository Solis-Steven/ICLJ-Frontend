"use client"
import { useState } from 'react';
import { Pagination } from "./components/Pagination";
import { AddButton } from "@/components/AddButton";
import { ConsolidationList } from "./components/ConsolidationList"
const page = () => {

  const [consolidations, setConsolidations] = useState([
    { id: 1, name: 'Shekinah', description: 'Descripción 1' },
    { id: 2, name: 'Shekinah', description: 'Descripción 2' },
  ]);
  const addConsolidation = () => {
    setConsolidations([
      ...consolidations,
      { id: consolidations.length + 1, name: 'New Consolidation ', description: 'New Description' },
    ]);
  };
  const editConsolidation = (id) => {
    console.log('Editar', id);
  };
  const deleteConsolidation = (id) => {
    setConsolidations(consolidations.filter((c) => c.id !== id));
  };
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const itemsPerPage = 5;
  const totalPages = Math.ceil(consolidations.length / itemsPerPage);
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