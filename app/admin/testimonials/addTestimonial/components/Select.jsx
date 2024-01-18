
export const Select = ({ value, onChange }) => {
    const isPlaceholderOptionDisabled = value !== "";
  
    return (
      <div className="my-5">
        <label
          htmlFor="problem-type"
          className="text-gray-600 uppercase block text-md font-bold"
        >
          Tipo
        </label>
        <select
          id="problem-type"
          value={value}
          onChange={onChange}
          className="mt-3 p-3 border rounded-xl bg-gray-50 text-gray-600 w-full"
        >
          {!isPlaceholderOptionDisabled && (
            <option value="" disabled>
              --Selecciona un Valor--
            </option>
          )}
          <option value="Financiero">Financiero</option>
          <option value="Sanidad">Sanidad</option>
          <option value="Conversión">Conversión</option>
          <option value="Liberación">Liberación</option>
          <option value="Provisión">Provisión</option>
        </select>
      </div>
    );
  };