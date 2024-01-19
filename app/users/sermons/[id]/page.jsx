"use client"

import { getSermon } from "@/app/admin/sermons/[id]/services/sermon.services";
import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import { notifyError } from "@/utilities/notifyError";
import { useRouter } from "next/navigation";

const Sermon = ({ params }) => {
    const [id] = useState(params.id);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { quill, quillRef } = useQuill({
        readOnly: true,
        modules: { toolbar: false }
    })

    const router = useRouter();

    useEffect(() => {
        const fetchSermon = async () => {
            try {
                const data = await getSermon(id);

                if (data) {
                    setTitle(data.title);
                    quill.setContents(JSON.parse(data.sermon));
                    setIsLoading(false);
                }
            } catch (error) {
                console.log({ error });
                notifyError(error.response?.data.msg);
            }
        }

        if (quill) {
            fetchSermon();
        }
    }, [quill]);

    return (
        <section className="flex flex-col items-center mb-10">
            <img
                    src="/sermones.jpg"
                    alt="Imagen de fondo"
                    className="top-0 left-0 w-full h-96 object-cover object-top relative"
                />
            <h1 className="mt-7 text-2xl text-tertiary font-bold text-center">
                Encuentra a Dios por medio de la lectura
            </h1>

            <div className="flex flex-col items-center w-3/4 max-w-4xl">

                <article className="mt-10 shadow-md p-5 w-full">
                    {
                        isLoading && (
                            <div className="flex justify-center">
                                <div
                                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                    role="status"
                                >
                                    <span
                                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                                    >
                                        Loading...
                                    </span>
                                </div>
                            </div>
                        )
                    }
                    <h2 className="text-lg font-black text-tertiary text-center mb-2">{title}</h2>

                    <p ref={quillRef}></p>
                </article>

                <button
                    type="button"
                    onClick={() => router.push("/users/sermons")}
                    className="mt-3 self-end">
                    Regresar
                </button>
            </div>
        </section>
    );
}

export default Sermon;