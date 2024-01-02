
export const Role = ({ value, onChange, show = true }) => {
    const isPlaceholderOptionDisabled = value !== "";
    return (
        <div className="my-6">
            <label
                htmlFor="userRole"
                className={` uppercase block text-md font-bold
                ${show ? "text-gray-300" : "text-gray-600"}`}
            >
                Rol
            </label>
            <select
                id="userRole"
                value={value}
                disabled={show}
                onChange={onChange}
                className={`mt-3 p-3 border rounded-xl bg-gray-50 
                ${show ? "text-gray-300 cursor-not-allowed w-full md:w-auto" : "text-gray-600 w-full"}`}
            >
                {!isPlaceholderOptionDisabled && (
                    <option value="" disabled>
                        --Selecciona un Valor--
                    </option>
                )}
                <option value="Miembro">Miembro</option>
                <option value="Lider">Lider</option>
                <option value="Administrador">Administrador</option>
            </select>
        </div>
    );
}