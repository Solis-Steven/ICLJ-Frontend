import { useState } from "react";

export const Input = ({
    id, 
    labelText, 
    placeholder, 
    disabled = false,
    value}) => {

    const [valueState, setValueState] = useState(value);

    return (
        <div className="my-5">
            <label
                className={`uppercase block text-md font-bold
                ${disabled ? "text-gray-300" : "text-gray-600"}`}
                htmlFor={id}>
                {labelText}
            </label>
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                value={valueState}
                onChange={e => setValueState(e.target.value)}
                disabled={disabled}
                className={`mt-3 p-3 border rounded-xl bg-gray-50
                ${disabled ? "cursor-not-allowed text-gray-300" : ""}`} />
        </div>
    );
}