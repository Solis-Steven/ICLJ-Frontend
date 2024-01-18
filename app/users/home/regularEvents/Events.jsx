"use client";
import { useEffect, useState } from "react";
import { getAllRegularEvents } from "@/app/admin/regularEvents/services/regularEvents.services";
import { List } from "./components/List";
export const RegularEvents = () => {
    const [regularEvents, setRegularEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    
    useEffect(() => {
        const fetchRegularEvents = async () => {
          try {
            const data = await getAllRegularEvents({ page });
            if (data) {
             setRegularEvents((prevRegularEvents) => [...prevRegularEvents, ...data]);
            }
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchRegularEvents();
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
      <section className="flex flex-col items-center mb-10 h-[150px]  ">
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
        <section className="overflow-y-auto custom-scrollbar ">
        {
            regularEvents?.length
            ? (

                regularEvents?.map((regularEvent => (
                  regularEvent?.visible && <List
                        key={regularEvent._id}
                        regularEvent={regularEvent}
                    />
                   
                )))
            )
            : !isLoading && (
                <p className="text-center">A&uacute;n no hay Eventos fijos agregados</p>
            )
        }
        </section>
          
      </section>
    </>
  );
};


