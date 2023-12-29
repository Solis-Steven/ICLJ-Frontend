import Link from "next/link";

export const Pagination = ({ currentPage, totalPages, handlePageChange, pages }) => {
 return (
    <nav className="mt-8 flex items-center justify-center">
    <ul className="flex space-x-4">
      <li>
        <Link href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </Link>
      </li>
      {pages.map((page) => (
        <li key={page} className={`${currentPage === page ? 'opacity-50 cursor-not-allowed' : ''}`}>
          <button className={`flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white ${currentPage === page ? 'cursor-not-allowed' : ''}`} onClick={() => handlePageChange(page)} disabled={currentPage === page}>
            {page}
          </button>
        </li>
      ))}
      <li>
        <Link href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Siguiente
        </Link>
      </li>
    </ul>
  </nav>
 );
};

