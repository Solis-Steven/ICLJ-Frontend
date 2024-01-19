import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { Input } from "@/components/Input";
import { getAllMembers } from "../../members/services/member.services";
export const AddEditModal = ({
  consolidationHousesId,
  isOpen,
  onClose,
  handleInputChange,
  handleSubmit,
  formData,
  page,
  isActive,
}) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const membersData = await getAllMembers({ page, isActive });
        setMembers(membersData);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);
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
                {consolidationHousesId ? "Editar CDC" : "Crear CDC"}
              </Dialog.Title>

              <Input
                id="HousesName"
                labelText="Nombre"
                placeholder="Nombre de la CDC"
                type="text"
                value={formData["name"]}
                onChange={(value) => handleInputChange("name", value)}
              />
              <label
                htmlFor="leader"
                className="uppercase block text-md font-bold text-gray-600"
              >
                LÍDER
              </label>
              <select
                id="leader"
                name="leader"
                value={formData["leader"]._id || formData["leader"].id}
                onChange={(e) => handleInputChange("leader", e.target.value)}
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
              >
                {!consolidationHousesId && (
                  <option  value="" disabled selected>
                    Seleccione un líder
                  </option>
                )}
                {members.map((miembro) => (
                  <option key={miembro._id} value={miembro._id}>
                    {miembro.name}
                  </option>
                ))}
              </select>
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
                placeholder="Ingrese la hora del CDC"
                type="time"
                value={formData["time"]}
                onChange={(value) => handleInputChange("time", value)}
              />
              <label
                htmlFor="address"
                className="uppercase block text-md font-bold text-gray-600"
              >
                DIRECCIÓN
              </label>
              <textarea
                id={formData["address"]}
                name="address"
                value={formData["address"]}
                onChange={(e) => handleInputChange("address", e.target.value)}
                rows="2"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />

              <div className="mt-5 sm:mt-6">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-secondary hover:bg-teal-300  text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={handleSubmit}
                >
                  Guardar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
