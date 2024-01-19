export const AnnouncementCard = ({ announcement }) => {
  const formatearFecha = (fechaString) => {
    const diasSemana = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    const meses = [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ];

    const fecha = new Date(fechaString);

    const diaSemana = diasSemana[fecha.getUTCDay()];
    const diaMes = fecha.getUTCDate();
    const mes = meses[fecha.getUTCMonth()];
    const anos = fecha.getUTCFullYear();

    const resultado = `${diaSemana} ${diaMes} de ${mes} del ${anos}`;

    return resultado;
  };
  return (
    <div className="flex flex-col px-4 mb-10 sm:flex-row gap-3 items-center mt-1  h-auto sm:h-96 w-full sm:w-2/3 overflow-hidden">
      {/* Información a la izquierda */}
      <article className="w-full sm:w-1/2 border-solid border border-primary rounded-lg overflow-hidden h-72 flex flex-col justify-between ">
        <div className="overflow-y-auto custom-scrollbar ">
          <p className="text-tertiary font-sans  ml-2  sm:text-base md:text-lg lg:text-xl ">
            {announcement.description}
          </p>
        </div>
        <div>
          <h2 className="text-2xl ml-2 font-semibold text-tertiary mt-2 uppercase font-sans">
            {announcement.name}
          </h2>
          <p className="text-tertiary font-sans ml-2 font-semibold">
            {" "}
            Fecha: {formatearFecha(announcement.date)}
          </p>
          <p className="text-tertiary font-sans ml-2 font-semibold">
            {" "}
            Hora:{" "}
            {new Date(announcement.date)
              .toISOString()
              .split("T")[1]
              .split(".")[0]
              .slice(0, -3)}
          </p>
        </div>
      </article>
      {/* Imagen a la derecha object-containt */}
      <div className="w-full sm:w-1/2 p-4 overflow-hidden">
        <img
          src={announcement.image}
          alt="Descripción de la imagen"
          className="w-full h-72  object-cover rounded-lg overflow-hidden"
        />
      </div>
    </div>
  );
};
