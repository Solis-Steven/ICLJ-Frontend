import React from 'react';
import { RegularEvents } from '@/app/users/home/regularEvents/Events';

const New = () => {
  return (
    <div className="flex absolute left-1/3 -top-1/2 
     w-1/3 text-center">
      <div className="bg-secondary h-full sm:h-[150px] p-5 text-left w-1/3">
        <h3 className='font-bold'
        >Soy nuevo!</h3>
        <p className='text-xs'
        >Bienvenido a Casa de Luz Jireh, si esta es su primera vez visitándonos, conoce nuestros eventos fijos.</p>
      </div>
      <RegularEvents />
    </div>
  );
}

export default New;