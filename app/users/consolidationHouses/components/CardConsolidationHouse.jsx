export const CardConsolidationHouse = ({ consolidationHouse }) => {
  const formateardiaSemana = (fechaString) => {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const fecha = new Date(fechaString);
    const hora = new Date(fechaString)
      .toISOString()
      .split("T")[1]
      .split(".")[0]
      .slice(0, -3);
    const diaSemana = diasSemana[fecha.getUTCDay()];
    // Dividir la cadena en horas y minutos
    const partesHora = hora.split(":");
    const horas = parseInt(partesHora[0], 10);

    // Crear un objeto Date con una fecha ficticia y las horas proporcionadas
    const temp = new Date(2000, 0, 1, horas, parseInt(partesHora[1], 10));

    // Obtener la cadena de AM o PM
    var amOpm = temp.getHours() >= 12 ? "p.m." : "a.m.";

    const resultado = `${diaSemana} ${hora} ${amOpm}`;
    return resultado;
  };

  return (
    <section className="w-full mx-10 mt-4 mb-8 bg-primary rounded-lg md:w-[600px] py-3">
      <div className="flex justify-between mx-4 items-center">
        <h2
         className="text-white font-medium text-2xl font-sans mr-2">
          {consolidationHouse.name}
        </h2>
        {/* barra inicial header */}
        <div className="flex justify-between mt-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-7 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
            />
          </svg>

          <h3 className="text-white ml-1 font-medium text-lg font-sans text-center">
            {formateardiaSemana(consolidationHouse.date)}
          </h3>
        </div>
      </div>
      {/* líder */}
      <p className="text-white mt-2 mx-4 font-medium ">
        Líder a cargo: {consolidationHouse.leader.name}
      </p>
      {/* ubicación */}
      <hr className="line border-t border-white my-4"></hr>
      <div className="flex mx-4 gap-2 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          className="w-10 h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <p className="text-white line-clamp-4">
          {consolidationHouse.address}
        </p>
      </div>
    </section>
  );
};
