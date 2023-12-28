"use client"
import { useState } from 'react';
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

  return (
    <div className="h-screen w-full flex items-start justify-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[80] w-full space-y-8 overflow-x-auto">
        <h1 style={{ fontFamily: 'Roboto', fontWeight: 400, fontSize: '2rem', lineHeight: '2rem', letterSpacing: '-0.01em' }}>
          Casas de consolidación
        </h1>
        <div className="mt-8">
          <button
            type="button"
            className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={addConsolidation}
          >
            AGREGAR CDC
          </button>
        </div>
        <div className="space-y-4  border-2 bg-white rounded-md shadow-sm border-inherit border-border">
          {consolidations.map((consolidation) => (
            <div key={consolidation.id} className="flex flex-col sm:flex-row  items-center border-t rounded-md border-border py-2 px-2">
              <div className=" flex-1 w-full sm:w-1/2">
                <div className="text-lg leading-6 font-medium text-gray-900">{consolidation.name}</div>
                <div className="mt-2 text-sm text-gray-500">{consolidation.description}</div>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
                  onClick={() => editConsolidation(consolidation.id)}
                >
                  EDITAR
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                  onClick={() => deleteConsolidation(consolidation.id)}
                >
                  ELIMINAR
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;