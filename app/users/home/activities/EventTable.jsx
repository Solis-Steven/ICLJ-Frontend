"use client"

import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';

const EventTable = ({activities}) => {
  const events = activities;
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const emptyRows = Array.from({ length: 4 - currentEvents.length }, (_, index) => ({
    id: `empty-${index + 1}`,
    name: '\u200B', 
    description: '\u200B', 
  }));

  const rowsToDisplay = currentEvents.concat(emptyRows);

  return (
    <div className="flex flex-col items-center h-screen mt-4">
      <div className="max-w-screen-md w-full overflow-x-auto">
      <h1 className="text-center border-r border-l border-t border-gray-200 p-7">Eventos</h1>
        <table className="min-w-full border border-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {rowsToDisplay.map((row) => (
              <tr key={row.id}>
                <td className="px-6 text-center border-r py-4 text-sm font-medium text-gray-900 border-b">
                {row.date && (
                    <>
                      <div>{format(parseISO(row.date), 'MMM', { locale: es })}</div>
                      <div>{format(parseISO(row.date), 'd', { locale: es })}</div>
                      <div>{format(parseISO(row.date), 'EEEE', { locale: es })}</div>
                    </>
                  )}
                </td>
                <td className="px-6 py-4 m-5 text-sm text-gray-500 font-semibold flex items-center justify-between">
                  <div>
                    {row.time && (
                      <div className="text-secondary">{row.time}</div>
                    )}
                    {row.name}
                  </div>
                  <button
                    type="button"
                    className="text-white bg-primary hover:bg-darkPrimary text-sm rounded-full ml-3 p-2"
                    // onClick={}
                  >
                    Registrarme
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center space-x-4 border-r border-l border-b border-gray-200 p-5">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 font-medium text-sm  text-white transition ${
                    currentPage === 1 ? 'cursor-not-allowed' : ''
                }`}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500 logo-icon transition-transform transform hover:scale-110">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

            </button>

            <span className="text-sm text-gray-700">{currentPage}</span>

            <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 font-medium text-sm  text-white transition ${
                currentPage === totalPages ? 'cursor-not-allowed' : ''
            }`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500 logo-icon transition-transform transform hover:scale-110">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};

export default EventTable;