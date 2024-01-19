import React from "react";

const Options = (props) => {
  const options = [
    {
      text: "Horario",
      handler: props.actionProvider.HorariosHandler,
      id: 1,
    },
    { text: "Sedes", handler: props.actionProvider.SedesHandler, id: 2 },
    { text: "Contacto", handler: props.actionProvider.PastoresHandler, id: 3 },
    { text: "Ubicación", handler: props.actionProvider.UbicacionHandler, id: 4 },
  ];

  const buttonsMarkup = options.map((option) => (
    <button key={option.id} onClick={option.handler} className=" px-2 mx-2 my-2 bg-transparent text-center border-2 rounded-lg border-primary justify-items-center">
      {option.text}
    </button>
  ));

  return <div className="flex flex-wrap ">{buttonsMarkup}</div>;
};

export default Options;