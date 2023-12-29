import { DeleteButton } from "@/components/DeleteButton";
import { EditButton } from "@/components/EditButton";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { deleteTestimonial } from "../services/testimonials.services";
import { notifySuccess } from "@/utilities/notifySuccess";

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
            const data = await deleteTestimonial(testimonialId);
            setTestimonials((prevTestimonial) =>
                prevTestimonial.filter((testimonial) => testimonial._id !== testimonialId)
            );

            notifySuccess(data.msg);
        } catch (error) {

        } catch (error) {
            console.error("Error deleting member:", error);
        }
    };

    return(
        <section className="flex flex-col md:flex-row gap-3 items-center 
        justify-between border-b-2 pb-3 mb-5">

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