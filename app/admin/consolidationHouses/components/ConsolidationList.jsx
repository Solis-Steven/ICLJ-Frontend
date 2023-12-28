import {EditButton} from "@/components/EditButton";
import {DeleteButton} from "@/components/DeleteButton";

export const ConsolidationList = ({ currentConsolidations, editConsolidation, deleteConsolidation }) => {
 return (
    <div className="space-y-0 border shadow-sm border-inherit border-border">
      {currentConsolidations.map((consolidation) => (
        <div key={consolidation.id} className="flex flex-col sm:flex-row items-center border-t border-border m-0 py-2 px-2">
          <div className="flex-1 w-full">
            <div className="text-lg leading-6 font-medium text-gray-900">{consolidation.name}</div>
            <div className="mt-2 text-sm text-gray-500">{consolidation.description}</div>
          </div>
          <div className="flex space-x-2">
            <EditButton
              editElement={() => editConsolidation(consolidation.id)}
              name="Editar"
            />
            <DeleteButton
              deleteElement={() => deleteConsolidation(consolidation.id)}
              name="Eliminar"
            />
          </div>
        </div>
      ))}
    </div>
 );
};

