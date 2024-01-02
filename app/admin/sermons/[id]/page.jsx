"use client"

import { useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import toolbar from "@/config/toolbar";
import { useRouter } from "next/navigation";
import { AddButton } from "@/components/AddButton";
import { Input } from "@/components/Input";
import { notifyError } from "@/utilities/notifyError";
import { notifySuccess } from "@/utilities/notifySuccess";
import { getSermon, updateSermon } from "./services/sermon.services";

const Sermon = ({ params }) => {
    const [id, setId] = useState(params.id);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [sermon, setSermon] = useState({});

    const { quill, quillRef } = useQuill({
        modules: {
            toolbar
        }
    });

    const router = useRouter();

    const handleTitleChange = (title) => {
        setTitle(title);
    };

    const handleDateChange = (date) => {
        setDate(date);
    };

    useEffect(() => {
        const getSermonEffect = async () => {
            try {
                const data = await getSermon(id);
                setTitle(data.title);
                setDate(data.date?.split("T")[0]);
                quill.setContents(JSON.parse(data.sermon));
                setSermon(data);
            } catch (error) {
                console.log({ error });
                notifyError(error.response?.data.msg);
            }
        }

        if (quill) {
            getSermonEffect();
        }
    }, [quill]);

    const handleEdit = async () => {
        try {
            const sermonString = JSON.stringify(quill.getContents());
            const data = await updateSermon(id,
                {
                    title,
                    date,
                    sermon: sermonString
                });
            notifySuccess(data.msg);
            router.push("/admin/sermons");
        } catch (error) {
            notifyError(error.response.data.msg);
        }
    }

    return (
        <section className="w-full">
            <div className="flex gap-3 ">
                <button
                    onClick={() => router.push("/admin/sermons")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

                <h1 className="font-bold text-2xl">Editar Serm&oacute;n</h1>
            </div>

            <section className="shadow-lg p-5 mt-5">
                <form>

                    <Input
                        id="sermonTitle"
                        labelText="Título"
                        placeholder="Título del sermón"
                        value={title}
                        onChange={handleTitleChange}
                    />

                    <Input
                        id="sermonDate"
                        labelText="Fecha"
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                    />

                    <div className="my-5">
                        <div ref={quillRef}></div>
                    </div>

                    <AddButton
                        name="Guardar Cambios"
                        addElement={handleEdit}
                    />
                </form>
            </section>
        </section>
    );
}

export default Sermon;