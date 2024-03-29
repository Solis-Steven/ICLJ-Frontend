export const List = ({ regularEvent }) => {
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
    <section className="flex items-center bg-white overflow-hidden border-b-2 border-grey-200">
      <article className="flex flex-col mx-2 w-[300px]">
        
        <div className="flex">
          <h1 className="font-medium font-sans ">Evento:</h1>
          <p className="ml-2 font-sans text-left">{regularEvent.name}</p>
        </div>
        <div className="flex">
          <h1 className="text-sm font-medium font-sans text-tertiary">Fecha:</h1>
          <p className="ml-2 font-sans text-sm text-tertiary ">
            {formateardiaSemana(regularEvent.date)}
          </p>
        </div>
        <div className="flex">
          <h1 className="text-sm font-medium font-sans text-tertiary">Encargado:</h1>
          <p className="ml-2 font-sans text-sm text-tertiary ">{regularEvent.manager.name}</p>
        </div>
      </article>
    </section>
  );
};
