"use client"

import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import toolbar from "@/config/toolbar";
import { AddButton } from "@/components/AddButton";
import { notifySuccess } from "@/utilities/notifySuccess";
import { addSermon } from "./services/addSermon.services";

const AddSermon = () => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const sermonData = {
            title,
            date,
            sermon: JSON.stringify(quill.getContents())
        }

        try {
            const data = await addSermon(sermonData)

            notifySuccess(data.msg);

            setTitle("");
            setDate("");
            quill.setText("");
        } catch (error) {

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

                <h1 className="font-bold text-2xl">Nuevo Serm&oacute;n</h1>
            </div>

            <section className="shadow-lg p-5 mt-5">
                <form>

                    <div className="w-full lg:w-1/3">

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
                            placeholder=""
                            type="date"
                            value={date}
                            onChange={handleDateChange}
                        />
                    </div>

                    <div className="my-5">
                        <div ref={quillRef}></div>
                    </div>

                    <AddButton
                        name="Agregar Sermón"
                        addElement={handleSubmit}
                    />
                </form>
            </section>
        </section>
    );
}

export default AddSermon;