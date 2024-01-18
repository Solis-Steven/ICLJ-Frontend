export const AddButton = ({ addElement, name }) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium 
      rounded-md shadow-sm text-white bg-teal-400 hover:bg-teal-300 
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      gap-2"
      onClick={addElement}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

      {name}
    </button>
  );
};
