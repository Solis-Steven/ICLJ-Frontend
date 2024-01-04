import { useEffect, useState } from "react";

export const Search = ({
    placeholder,
    onChange
}) => {
    const [valueState, setValueState] = useState("");

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValueState(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className="relative">
            <input
                type="text"
                placeholder={placeholder}
                value={valueState}
                onChange={handleChange}
                className="border-2 rounded-xl p-2 pl-12"
            />
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </span>
        </div>
    );
}
