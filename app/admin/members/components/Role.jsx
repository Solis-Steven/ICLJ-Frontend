
export const Role = ({value}) => {
    return (
        <div className="my-5">
            <label
                htmlFor="name"
                className="text-gray-300 uppercase block text-md font-bold"
            >
                Rol
            </label>
            <select
                id="proble-type"
                value={value}
                disabled={true}
                className="mt-3 p-3 border rounded-xl bg-gray-50
                cursor-not-allowed text-gray-300"
            >
                <option value="Miembro">Miembro</option>
                <option value="Lider">Lider</option>
                <option value="Administrador">Administrador</option>
            </select>
        </div>
    );
}