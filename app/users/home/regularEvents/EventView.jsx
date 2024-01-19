import React from 'react';
import { RegularEvents } from './Events';

const EventView = () => {
  return (
    <section className="flex justify-center sm:absolute sm:left-1/3 sm:top-[350px] sm:w-1/3">
      <div className="flex flex-col gap-4 mt-10 mx-6 sm:flex-row sm:mt-0 sm:gap-0 sm:justify-center">
        <div className="flex flex-col bg-secondary h-full sm:h-[150px] p-5 justify-center text-center flex-21">
          <h3 className='font-bold text-white'
          >Soy nuevo!</h3>
          <p className='text-xs  text-white'
          >Bienvenido a Casa de Luz Jireh, conoce nuestros eventos fijos.</p>
        </div>
        <RegularEvents />
      </div>
    </section>
  );
}

export default EventView;

// md:absolute md:left-1/3 md:top-[350px] md:w-1/3