import { useEffect, useState } from "react";

export const Input = ({ children, formValue, onChange, id, type = "text" }) => {
    const [valueState, setValueState] = useState(formValue);
    const [error, setError] = useState(false);

    useEffect(() => {
        setValueState(formValue);
    }, [formValue]);

    const handleChange = (value) => {
        setValueState(value);

        if (value.trim() === "") {
            setError(true);
            if (onChange) {
                onChange(value);
            }
            return;
        }

        if (onChange) {
            onChange(value);
        }

        setError(false);
    }

    return (
        <section>

            <div className="relative">
                <input
                    type={type}
                    id={id}
                    value={valueState}
                    onChange={e => handleChange(e.target.value)}
                    className={`block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent 
                        rounded-lg appearance-none focus:outline-none focus:ring-0 peer
                        border
                        ${error ? "border-red-500 text-red-500 focus:border-red-500"
                            : "border-gray-300 text-white focus:border-secondary"}`}
                    placeholder=" " />
                <label
                    htmlFor={id}
                    className={`absolute text-sm 
                        duration-200 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] 
                        bg-tertiary px-2 peer-focus:px-2 
                        peer-placeholder-shown:scale-100 
                        peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 
                        peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1
                        ${error ? "text-red-500 peer-focus:text-red-500" : "text-white peer-focus:text-secondary"}`}>
                    {children}
                </label>
            </div>
            {
                error &&
                <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500 mt-2">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>

                    <p
                        id="filled_success_help"
                        className="mt-2 text-xs text-red-500 text-center">
                        Este campo es obligatorio
                    </p>
                </div>
            }
        </section>
    );
}