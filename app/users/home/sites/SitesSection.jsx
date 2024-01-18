"use client"

import { getAllSites } from '@/app/admin/sites/services/site.services';
import { useState, useEffect } from 'react'

export default function SitesSection() {

  const [page, setPage] = useState(1);
  const [sites, setSites] = useState([]);

    useEffect(() => {
        const getSites = async () => {
            try {
                const data = await getAllSites({ page });
                if(data)
                  setSites((prevSites) => [...prevSites, ...data]);
            } catch (error) {
                console.error("Error getting sites:", error);
            }
        };
        getSites();
    }, []);

  return (
    <section>
      <div className='text-center mt-40'>
        <h1 className='font-bold text-4xl text-gray-800 leading-tight mb-4'>
        UNA IGLESIA. <br />MULTIPLES LOCALIDADES
        </h1>
        <p className='text-sm text-gray-500'>
          Estás invitado a visitarnos en cualquiera de nuestras sedes.
        </p>
      </div>

      <div className='w-full max-w-screen-xl mx-auto flex flex-wrap justify-center my-40'>
        {sites?.map(site => (
          <div key={site._id} className='relative opacity-90 w-full sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/3 
          -m-12 mb-20 transition-transform transform hover:scale-105 hover:opacity-100'>
            <img
              src={site.image}
              alt={`Imagen de ${site.name}`}
              className='mx-auto max-w-full w-60 h-80 mb-2 rounded-md'
            />
            <div className='absolute bottom-10 left-0 right-0 text-center text-white font-bold mb-4'>
              <h2 className='text-shadow'>Casa de Luz Jireh</h2>
              <p className='text-shadow uppercase'>{site.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
