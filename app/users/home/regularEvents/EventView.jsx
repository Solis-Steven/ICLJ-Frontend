import React from 'react';
import { RegularEvents } from './Events';

const EventView = () => {
  return (
    <div className="flex absolute left-1/3 top-[350px] w-1/3 text-center">
      <div className="flex flex-col bg-secondary h-full sm:h-[150px] p-5 text-left justify-center  w-1/3 ">
        <h3 className='font-bold text-white'
        >Soy nuevo!</h3>
        <p className='text-xs  text-white'
        >Bienvenido a Casa de Luz Jireh, conoce nuestros eventos fijos.</p>
      </div>
      <div>
      <RegularEvents />
      </div>
    </div>
  );
}

export default EventView;