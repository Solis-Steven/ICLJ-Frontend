"use client"

import React, { useState, useEffect } from 'react';
import { format, parseISO, isAfter, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from "@/hooks/useAuth";
import { addUserActivitie } from '@/app/admin/activities/[id]/services/activitie.services';
import { notifySuccess } from '@/utilities/notifySuccess';
import { useRouter } from "next/navigation";
import RegisterButtom from './components/registerButtom';

const EventTable = ({ activities }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { signOut, auth } = useAuth();

  const router = useRouter();

  const eventsPerPage = 4;
  const currentDate = startOfToday();
  const filteredEvents = activities.filter((activity) => isAfter(parseISO(activity.date), currentDate));
  const events = [...filteredEvents].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const emptyRows = Array.from({ length: 4 - currentEvents.length }, (_, index) => ({
    _id: `empty-${index + 1}`,
    name: '\u200B',
    description: '\u200B',
  }));
  const rowsToDisplay = currentEvents.concat(emptyRows);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <h1 className='font-bold text-2xl -mt-20 mb-10 text-center'>
        Estas actividades en Casa de Luz Jireh
      </h1>
      <div className="max-w-screen-md w-full overflow-x-auto">
        <h2 className="text-center border-r border-l border-t border-gray-200 p-7">
          Eventos
        </h2>
        <table className="min-w-full border border-gray-200">
          <tbody className="divide-y divide-gray-200">
            {rowsToDisplay.map((row) => (
              <tr key={row._id}>
                <td className="px-6 text-center border-r py-4 text-sm font-medium text-gray-900 border-b">
                  {row.date && (
                    <>
                      <div>{format(parseISO(row.date), 'MMM', { locale: es })}</div>
                      <div>{format(parseISO(row.date), 'd', { locale: es })}</div>
                      <div>{format(parseISO(row.date), 'EEEE', { locale: es })}</div>
                      <div>{format(parseISO(row.date), 'yyyy', { locale: es })}</div>
                    </>
                  )}
                </td>
                <td className="px-6 py-4 m-5 text-sm text-gray-500 font-semibold flex items-center justify-between">
                  <div>
                    {row.time && <div className="text-secondary">{row.time}</div>}
                    {row.name}
                  </div>
                  {row.assistance && (
                    <RegisterButtom
                    row={row}/>
                  )}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500 logo-icon transition-transform transform hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500 logo-icon transition-transform transform hover:scale-110"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventTable;