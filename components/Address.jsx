export const Address = ({ value, handleChange }) => {
    return (
        <div className="my-5">
            <label
                className="uppercase block text-md font-bold text-gray-600"
                htmlFor="address"
            >
                Dirección
            </label>
            <textarea
                id="address"
                placeholder="Tu dirección de residencia"
                value={value} 
                onChange={(e) => handleChange(e.target.value)} 
                className="mt-3 p-3 border rounded-xl bg-gray-50 w-full"
            ></textarea>
        </div>
    );
}
