import { DeleteButton } from '@/components/DeleteButton'
import React, { useState } from 'react';

const TemplateUser = ({ user }) => {
  const [check, setCheck] = useState(false);

  const handleToggle = () => {
    setCheck(!check);
  };
  
  return (
    <section className="shadow-lg p-5">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontWeight: 'bold', fontSize: '3xl' }}>{user.name}</h1>
                    <p>{user.phone}</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <span style={{ fontSize: '12px'}}>ASISTENCIA</span>
                  <button style={{ marginRight: '40px' }}
                          className={`rounded-full w-6 h-6 border border-gray-300 flex items-center justify-center cursor-pointer focus:outline-none ${
                            check ? 'bg-blue-500 text-white border-blue-500' : ''
                    }`}
                    onClick={handleToggle}
                  ></button>
                  <DeleteButton 
                  />
                </div>
            </div>
    </section>
  )
}

export default TemplateUser