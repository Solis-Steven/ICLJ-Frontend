import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { set } from "date-fns";
export const AddEditModal = ({
  anuncioId,
  isOpen,
  onClose,
  handleInputChange,
  handleSubmit,
  formData,
  isLoading,
}) => {
  const fileSelectedHandler = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        handleInputChange("image", reader.result); // Pasa el Data URL al formulario
      };

      reader.readAsDataURL(selectedFile); // Lee la imagen como Data URL
    }
  };


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
                {anuncioId ? "Editar anuncio" : "Crear anuncio"}
              </Dialog.Title>

              <Input
                id="AnnouncementName"
                labelText="Nombre"
                placeholder="Nombre del anuncio"
                type="text"
                value={formData["name"]}
                onChange={(value) => handleInputChange("name", value)}
              />
              <label
                htmlFor="address"
                className="uppercase block text-md font-bold text-gray-600"
              >
                DESCRIPCIÓN
              </label>
              <textarea
                id={formData["description"]}
                name="description"
                value={formData["description"]}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows="2"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              <Input
                id="date"
                labelText="Fecha"
                placeholder={"Ingrese la fecha"}
                type="date"
                value={formData["date"]}
                onChange={(value) => handleInputChange("date", value)}
              />
              <Input
                id="time}"
                labelText="Hora"
                placeholder="Ingrese la hora del evento"
                type="time"
                value={formData["time"]}
                onChange={(value) => handleInputChange("time", value)}
              />
              <div className="container flex items-center ">
                <span className=" mr-4 uppercase block text-md font-bold text-gray-600">
                  IMAGEN
                </span>

                <label
                  htmlFor="image"
                  className="cursor-pointer inline-block rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                >
                  SUBIR IMAGEN
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onChange={fileSelectedHandler}
                    className="hidden" // Ocultar el input original
                  />
                </label>
              </div>

              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{ width: "100%", height: 200, marginTop: "10px" }}
                />
              )}
              {/* Spinner*/}
              {isLoading && (
                <div className="flex justify-center mt-2">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                </div>
              )}
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
