import { EditButton } from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
export const ConsolidationList = ({ currentConsolidations, editConsolidation, deleteConsolidation }) => {
  const {
    setDeleteModal
  } = useModal();

  const handleDeleteModal = (consolidation) => {
    setDeleteModal(
      "Eliminar Casa de consolidación",
      "¿Estás seguro de que quieres eliminar una casa de consolidación?",
      () => deleteConsolidation(consolidation._id)
    );
  };
  return (
    <div className="space-y-0 ">
      {currentConsolidations?.map((consolidation) => (
        <div key={consolidation._id} className="flex flex-col sm:flex-row items-center border-b border-b-2 m-0 py-2 px-2">
          <div className="flex-1 w-full">
            <div className="text-lg leading-6 font-medium text-gray-900">{consolidation.name}</div>
            <div className="mt-2 text-sm text-gray-500">{consolidation.address}</div>
          </div>
          <section className="flex flex-col sm:flex-row gap-3 items-center mt-1 ">
            <EditButton
              editElement={() => editConsolidation(consolidation)}
            />
            <DeleteButton
              deleteElement={() => handleDeleteModal(consolidation)}
            />
          </section>
        </div>
      ))}
    </div>
  );
};

