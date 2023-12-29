import { DeleteButton } from "@/components/DeleteButton";
import { EditButton } from "@/components/EditButton";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { deleteTestimonial } from "../services/testimonials.services";

export const TestimonialPreview = ({testimonial, setTestimonials}) => {
    const router = useRouter();

    const { 
        setDeleteModal
    } = useModal();

    const handleDeleteModal = () => {
        setDeleteModal(
          "Eliminar Testimonio",
          "Los testimonios eliminados ya no se recuperarán",
          () => deleteTestimonialCallback(testimonial._id)
        );
    };

    const deleteTestimonialCallback = async (testimonialId) => {
        try {
            await deleteTestimonial(testimonialId);
            setTestimonials((prevTestimonial) =>
                prevTestimonial.filter((testimonial) => testimonial._id !== testimonialId)
            );
        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    return(
        <section className="flex items-center justify-between border-b-2 pb-3">
            <div className="">
                <h3 className="font-bold text-lg">{testimonial.personName}</h3>
                <p className="text-tertiary">{testimonial.type}</p>
            </div>

            <div className="flex gap-3">
                <EditButton 
                    editElement={() => router.push(`/admin/testimonials/${testimonial._id}`)}
                />
                <DeleteButton 
                    deleteElement={handleDeleteModal}
                />
            </div>
        </section>
    );
}