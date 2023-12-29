import { DeleteButton } from "@/components/DeleteButton";
import { EditButton } from "@/components/EditButton";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { notifySuccess } from "@/utilities/notifySuccess";
import { deleteSermon } from "../services/sermons.services";

export const SermonPreview = ({sermon, setSermons}) => {
    const router = useRouter();

    const { 
        setDeleteModal
    } = useModal();

    const handleDeleteModal = () => {
        setDeleteModal(
          "Eliminar Sermón",
          "Los sermones eliminados ya no se recuperarán",
          () => deleteSermonCallback(sermon._id)
        );
    };

    const deleteSermonCallback = async (sermonId) => {
        try {
            const data = await deleteSermon(sermonId);
            setSermons((prevSermon) =>
                prevSermon.filter((sermon) => sermon._id !== sermonId)
            );

            notifySuccess(data.msg);
        } catch (error) {
            console.error("Error deleting sermon:", error);
        }
    };

    return(
        <section className="flex flex-col md:flex-row gap-3 items-center 
        justify-between border-b-2 pb-3 mb-5">
            <h3 className="font-bold text-lg">{sermon.title}</h3>

            <div className="flex gap-3">
                <EditButton 
                    editElement={() => router.push(`/admin/sermons/${sermon._id}`)}
                />
                <DeleteButton 
                    deleteElement={handleDeleteModal}
                />
            </div>
        </section>
    );
}