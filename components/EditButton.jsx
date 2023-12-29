export const EditButton = ({ editElement }) => {
    return (
       <button
         type="button"
         className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-secondary hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
         onClick={editElement}
       >
        Editar
       </button>
    );
   };
   
