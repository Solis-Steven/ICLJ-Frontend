"use client"

import { AddButton } from "@/components/AddButton";
import { useRouter } from "next/navigation";

const page = () => {
    const router = useRouter()
    
    return(
        <section>
            <h1 className="font-bold text-2xl mb-5">Testimonios</h1>    

            <AddButton 
                name="Agregar Testimonio"
                addElement={() => router.push("/admin/testimonials/addTestimonial")}
            />    
        </section>
    );
}

export default page;