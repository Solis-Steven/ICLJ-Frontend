"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";

const AddTestimonial = () => {
    const [name, setName] = useState("");

    const router = useRouter();

    return (
        <section>
            <div className="flex gap-3 ">
                <button
                    onClick={() => router.push("/admin/testimonials")}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

                <h1 className="font-bold text-2xl">Nuevo Testimonio</h1>
            </div>
        </section>
    );
}

export default AddTestimonial;