export const DeleteButton = ({ deleteElement, name }) => {
    return (
       <button
         type="button"
         className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
         onClick={deleteElement}
       >
         {name}
       </button>
    );
   };
   
