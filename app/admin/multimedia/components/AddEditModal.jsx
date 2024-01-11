import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";
export const AddEditModal = ({
  multimediaId,
  isOpen,
  onClose,
  handleInputChange,
  handleSubmit,
  formData,
  isLoading,
}) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-5 inset-0 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4   text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-1/3 sm:p-6">
              <div className="absolute top-0 right-0 mt-4 mr-4">
                <button type="button" onClick={onClose}>
                  {/* Alinear el botón en la esquina superior derecha */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </button>
              </div>
              <Dialog.Title
                as="h3"
                className="text-lg leading-6 font-medium text-gray-900"
              >
                {multimediaId ? "Editar multimedia" : "Crear multimedia"}
              </Dialog.Title>

              <Input
                id="MultimediaName"
                labelText="Nombre"
                placeholder="Nombre del archivo"
                type="text"
                value={formData["name"]}
                onChange={(value) => handleInputChange("name", value)}
              />
              <div className=" flex items-center justify-between mr-4">
                <span className="uppercase block text-md font-bold text-gray-600">
                  Visible
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="visible"
                    name="visible"
                    checked={formData["visible"]}
                    onChange={(e) =>
                      handleInputChange("visible", e.target.checked)
                    }
                    type="checkbox"
                    className="sr-only peer"
                  />
                  <div className=" w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
                </label>
              </div>
              {/* Spinner*/}
              {isLoading && <Spinner />}
              <div className="mt-2 bg-white rounded-lg overflow-hidden flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.0"
                  stroke="currentColor"
                  class="w-20 h-20"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-green-500 bg-white mt-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span className="text-gray-500 text-sm font-semibold mt-12 ml-1">
                    {"Completado"}
                </span>
              </div>
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent 
                  shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={handleSubmit}
                >
                  {isLoading ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
