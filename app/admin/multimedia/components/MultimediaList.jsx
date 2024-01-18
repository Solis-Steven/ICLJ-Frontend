import { EditButton } from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
import { FileCompleted } from "./FileCompleted";
export const MultimediaList = ({ currentMultimedia, editMultimedia, deleteMultimedia }) => {
  const {
    setDeleteModal
  } = useModal();

  const handleDeleteModal = (multimedia) => {
    setDeleteModal(
      "Eliminar archivo multimedia",
      "¿Estás seguro de que quieres eliminar un archivo multimedia?",
      () => deleteMultimedia(multimedia)
    );
  };
  return (
    <div className="space-y-0">
      {currentMultimedia?.map((multimedia) => (

        <div key={multimedia._id} className="flex flex-col sm:flex-row items-center border-b border-b-2 m-0 py-2 px-2">
          <div className="flex-1 w-full">
            <FileCompleted
            label = {multimedia && multimedia.name} />
           
            
          </div>
          <div className="flex flex-col">
          <div className="flex justify-end mb-4">
          <div className="mt-0 text-md text-gray-500 font-medium">{multimedia &&  multimedia.visible? "Visible": "Oculta" }</div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 items-center mt-1">
            <EditButton
              editElement={() => editMultimedia(multimedia)}
            />
            <DeleteButton
              deleteElement={() => handleDeleteModal(multimedia)}
            />
          </div>
          </div>
        
        </div>
      ))}
    </div>
  );
};

