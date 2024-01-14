"use client"

import { useEffect } from "react";
import { useQuill } from "react-quilljs";

export const SolidCard = ({testimonial}) => {
    const { quill, quillRef } = useQuill({
        readOnly: true,
        modules: { toolbar: false }
    });

    useEffect(() => {
        if(quill) {
            quill.setContents(JSON.parse(testimonial.testimonial));
        }
    }, [quill])

    return (
        <article className="flex flex-col justify-between 
        bg-primary rounded-lg p-4 flex-1">
            <p ref={quillRef} className="text-white"></p>

            <div className="flex justify-between mt-5">
                <div className="">
                    <h3 className="text-lg font-bold text-white">{testimonial.personName}</h3>
                    <h4 className="text-white">{testimonial.type}</h4>
                </div>

                <svg width="78" height="58" viewBox="0 0 78 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M61.41 57.04C56.81 57.04 52.9767 55.5067 49.91 52.44C46.8433 49.22 45.31 45.1567 45.31 40.25C45.31 31.3567 47.9167 23.3833 53.13 16.33C58.4967 9.12333 64.63 3.75666 71.53 0.229997L72.45 0C73.5233 0 74.06 0.613335 74.06 1.84C74.06 2.14667 73.83 2.53 73.37 2.99C69.8433 6.21 67.16 9.35333 65.32 12.42C63.48 15.4867 62.56 18.17 62.56 20.47C62.56 23.0767 63.94 25.2233 66.7 26.91C70.0733 28.75 72.6033 30.7433 74.29 32.89C76.13 34.8833 77.05 37.6433 77.05 41.17C77.05 45.6167 75.5167 49.3733 72.45 52.44C69.3833 55.5067 65.7033 57.04 61.41 57.04ZM15.64 57.04C11.3467 57.04 7.66667 55.5067 4.6 52.44C1.53333 49.22 0 45.1567 0 40.25C0 31.3567 2.60667 23.3833 7.82 16.33C13.1867 9.12333 19.1667 3.83333 25.76 0.459994C26.0667 0.306663 26.45 0.229997 26.91 0.229997C27.9833 0.229997 28.52 0.766666 28.52 1.84C28.52 2.3 28.3667 2.68333 28.06 2.99C24.5333 6.21 21.85 9.35333 20.01 12.42C18.17 15.4867 17.25 18.17 17.25 20.47C17.25 23.8433 18.63 25.99 21.39 26.91C24.61 28.4433 27.0633 30.36 28.75 32.66C30.59 34.8067 31.51 37.6433 31.51 41.17C31.51 45.6167 29.9767 49.3733 26.91 52.44C23.8433 55.5067 20.0867 57.04 15.64 57.04Z" fill="#FFFFFF" />
                </svg>

            </div>
        </article>
    );
}