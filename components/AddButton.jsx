export const AddButton = ({ addElement, name }) => {
    return (
       <button
         type="button"
         className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-400 hover:bg-teal-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
         onClick={addElement}
       >
         {name}
       </button>
    );
   };
   
