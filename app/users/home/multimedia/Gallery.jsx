"use client";
import React, { useEffect, useState } from "react";
import { getAllmultimedia } from "@/app/admin/multimedia/services/multimedia.services";
export const Gallery = () => {
  const [multimedia, setMultimedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMultimedia = async () => {
    try {
      const data = await getAllmultimedia({ page });
      //necesito filtrar los que son visibles en multimedia
      const visibleMultimedia = data.filter((multimedia) => multimedia.visible);
      setMultimedia((prevMultimedia) => [
        ...prevMultimedia,
        ...visibleMultimedia,
      ]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Multimedia:", error);
    }
  };
  useEffect(() => {
    fetchMultimedia();
  }, [page]);

  return (
    <section className="flex flex-col items-center mb-10 my-24 md:mx-20 lg:mx-40">
    <h2 className="mt-7 text-4xl text-tertiary font-bold text-center uppercase font-serif">Momentos en Comunidad</h2>
  
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
  
    {multimedia?.length ? (
      <div className="grid gap-4 w-auto my-6 mx-6">
        {/* Buscar el primer video en el array multimedia */}
        {multimedia.find(item => item.type === "video") ? (
          <div>
            <video className="h-96 w-full rounded-lg object-cover" controls>
              <source src={multimedia.find(item => item.type === "video").ref} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div>
            <img className="h-96 w-full rounded-lg object-cover" src={multimedia[0].ref} alt="" />
          </div>
        )}
  
        <div className="grid grid-cols-4 gap-3">
          {multimedia.filter(item => item.type !== "video").slice(0, 4).map((archivo, index) => (
            <div key={index}>
              {archivo.type === "video" ? (
                <video className="h-[207px] w-full rounded-lg object-cover" controls>
                  <source src={archivo.ref} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img className="h-[207px] w-full rounded-lg object-cover" src={archivo.ref} alt="" />
              )}
            </div>
          ))}
        </div>
      </div>
    ) : (
      !isLoading && (
        <p className="text-center">Aún no hay archivos multimedia agregados</p>
      )
    )}
  </section>
  
  
  );
};