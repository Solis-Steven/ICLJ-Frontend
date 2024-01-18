"use client";
import { useEffect, useState } from "react";
import { Bot } from "../home/chatbot/bot";
import Slider from "./components/Carousel";
import { InfoSection } from "./components/InfoSection";
import { CardConsolidationHouse } from "./components/CardConsolidationHouse";
import { getAllConsolidationHouses } from "@/app/admin/consolidationHouses/services/consolidationHouses.services";
const ConsolidationHouses = () => {
    const [consolidationHouses, setConsolidationHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    useEffect(() => {
        const fetchConsolidationHouses = async () => {
          try {
            const data = await getAllConsolidationHouses({ page });
            if (data) {
             setConsolidationHouses((prevConsolidationHouses) => [...prevConsolidationHouses, ...data]);
            }
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchConsolidationHouses();
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
    <>
    <section>
                <img
                    src="/bg.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover relative"
                />

                <div className="z-10 absolute top-40 left-10 ">
                    <p className="text-white text-lg">Casa de Luz Jireh</p>
                    <h1 className="text-white text-4xl font-bold">Donde los milagros ocurren</h1>
                </div>
            </section>

      <Slider />
      <InfoSection />
     
      <section className="flex flex-col items-center mb-10">
        <h2 className="mt-7 text-2xl text-tertiary font-bold text-center">
        Nuestras casas de consolidación
        </h2>
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
          {
            consolidationHouses?.length
            ? (

                consolidationHouses?.map((consolidationHouse => (
                    <CardConsolidationHouse
                        key={consolidationHouse._id}
                        consolidationHouse={consolidationHouse}
                    />
                )))
            )
            : !isLoading && (
                <p className="text-center">A&uacute;n no hay sermones agregados</p>
            )
        }
      </section>
      <Bot />
    </>
  );
};

export default ConsolidationHouses;
