"use client"

import { useState } from "react";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from "next/link";
export const EachActivitie = ({ activitie, updateActivitie }) => {
    const refactorDate = () => {
        const date = new Date(activitie.date);
        return(format(date, "EEEE d 'de' MMMM 'del' yyyy", { locale: es }));
    } 

    return (
        <section className="shadow-lg p-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>{activitie.name}</h1>
                    <p>{refactorDate()}, {activitie.time}</p>
                </div>
                <div>
                    <Link href={`/admin/activities/${activitie._id}`}
                    activitie={activitie}
                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 rounded-s-lg hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    >Ver m{'\u00E1'}s</Link>
                </div>
            </div>
        </section>
    );
};

