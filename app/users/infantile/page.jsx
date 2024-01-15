"use client";
import { useEffect, useState } from "react";
import { getAllInfantil } from "@/app/admin/infantile/services/infantil.services";
import { AnnouncementCard } from "./components/AnnouncementCard";
const Infantile = () => {
  const [infantil, setInfantil] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchInfantil = async () => {
      try {
        const data = await getAllInfantil({ page });
        if (data) {
          setInfantil((prevInfantil) => [...prevInfantil, ...data]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfantil();
  }, []);
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
  return (
    <section className="flex flex-col items-center mb-10">
      <h2 className="mt-7 text-2xl text-tertiary font-bold text-center">
        En casa de luz de jireh, los niños son como pequeñas semillas de bondad
        <br />
        que florecen con la enseñanza y el cuidado espiritual.
      </h2>
      <div className={" text-center mb-4"}>
        <h2 className="text-2xl font-semibold text-primary mt-12">
          {"ANUNCIOS"}
        </h2>
        <p className="text-2xl font-semibold text-tertiary mt-3">
          {"ACTIVIDADES Y DINÁMICAS NIÑOS"}
        </p>
      </div>
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

      <section className="flex flex-col"></section>
        {
            infantil?.length
            ? (

                infantil?.map((infantil => (
                    <AnnouncementCard
                        key={infantil._id}
                        announcement={infantil}
                    />
                )))
            )
            : !isLoading && (
                <p className="text-center">A&uacute;n no hay sermones agregados</p>
            )
        }
    </section>
  );
};

export default Infantile;
