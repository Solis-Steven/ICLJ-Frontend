import React from 'react';

const New = () => {
  return (
    <div className="flex absolute left-1/3 -top-1/2 
     w-1/3 text-center">
      <div className="bg-secondary h-30 p-5 text-left w-1/3">
        <h3 className='font-bold'
        >Soy nuevo!</h3>
        <p className='text-xs'
        >Bienvenido a Casa de Luz Jireh, si esta es su primera vez visitándonos, conoce nuestros eventos fijos.</p>
      </div>
      <div className="bg-white h-30 w-2/3">
        <p>eventos fijos</p>
      </div>
    </div>
  );
}

export default New;