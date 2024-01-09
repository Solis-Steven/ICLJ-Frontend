import { EditButton } from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
export const EventFixedList = ({ currentEventFixed, editEventFixed, deleteEventFixed }) => {
  const {
    setDeleteModal
  } = useModal();

  const handleDeleteModal = (eventFixed) => {
    setDeleteModal(
      "Eliminar evento fijo",
      "¿Estás seguro de que quieres eliminar una evento fijo?",
      () => deleteEventFixed(eventFixed._id)
    );
  };
  const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return (
    <div className="space-y-0 border shadow-sm border-inherit border-border">
      {currentEventFixed?.map((eventFixed) => (

        <div key={eventFixed._id} className="flex flex-col sm:flex-row items-center border-t border-border m-0 py-2 px-2">
          <div className="flex-1 w-full">
            <div className="text-lg leading-6 font-medium text-gray-900">{eventFixed && eventFixed.name}</div>
            <div className="mt-0 text-sm text-gray-500 font-medium"> Día:  {eventFixed &&  diasSemana[new Date (eventFixed.date).getDay()] }</div>
            <div className="mt-0 text-sm text-gray-500 font-medium "> Horario: {eventFixed &&  new Date (eventFixed.date).toISOString().split("T")[1].split(".")[0].slice(0, -3) }</div>
            <div className="mt-0 text-sm text-gray-500 font-medium"> Encargado: </div>
          </div>
          <div className="flex space-x-2">
            <EditButton
              editElement={() => editEventFixed(eventFixed)}
            />
            <DeleteButton
              deleteElement={() => handleDeleteModal(eventFixed)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

