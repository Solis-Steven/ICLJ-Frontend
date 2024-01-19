import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { Spinner } from "@/components/Spinner";
import { FileCompleted } from "./FileCompleted";
import Link from "next/link";
export const AddEditModal = ({
  multimediaId,
  isOpen,
  onClose,
  handleInputChange,
  handleSubmit,
  formData,
  isLoading,
  handleFileChange,
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
              {/*Si multimediaId contiene alog mostrar formData.ref como un link*/}
              {multimediaId && (
                <div>
                  <Link
                    href={formData.ref}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-800 text-sm font-semibold hover:underline"
                  >
                    {"Ver archivo"}
                  </Link>
                  <div
                    className="p-4 mt-1 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                    role="alert"
                  >
                    <span className="font-medium">Alerta de Información!</span> El
                    nuevo archivo cargado solo se verá después de guardar los
                    cambios.
                  </div>
                  <div className="container flex items-center">
                    <label
                      htmlFor="image"
                      className="cursor-pointer inline-block rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                    >
                      Cambiar Archivo
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={(e) => handleFileChange(e)}
                        className="hidden" // Ocultar el input original
                      />
                    </label>
                  </div>
                </div>
              )}
              {/* Si multimediaId contiene algo mostrar FileCompleted */}
              <FileCompleted />
              {/* Spinner*/}
              {isLoading && <Spinner />}
              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  disabled={isLoading}
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
