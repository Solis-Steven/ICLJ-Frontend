import { useState, useEffect } from "react";

export const Input = ({
    id, 
    labelText, 
    placeholder, 
    disabled = false,
    value = "",
    onChange,
    type = "text",
    checked
}) => {
    const [valueState, setValueState] = useState(value);

    useEffect(() => {
        setValueState(value);
    }, [value]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValueState(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

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
                type={type}
                placeholder={placeholder}
                value={valueState}
                onChange={handleChange}
                disabled={disabled}
                checked={checked}
                className={`mt-3 p-3 border rounded-xl bg-gray-50
                ${disabled ? "cursor-not-allowed text-gray-300" : "w-full"}`} />
        </div>
    );
};
