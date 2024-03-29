import { EditButton } from "@/components/EditButton";
import { DeleteButton } from "@/components/DeleteButton";
import { useModal } from "@/hooks/useModal";
export const AnnouncementList = ({ currentAnnouncements, editAnnouncements, deleteAnnouncements }) => {
  const {
    setDeleteModal
  } = useModal();

  const handleDeleteModal = (announcement) => {
    setDeleteModal(
      "Eliminar anuncio",
      "¿Estás seguro de que quieres eliminar un anuncio?",
      () => deleteAnnouncements(announcement)
    );
  };
  return (
    <div className="space-y-0">
      {currentAnnouncements?.map((announcement) => (

        <div key={announcement._id} className="flex flex-col sm:flex-row items-center border-b border-b-2 m-0 py-2 px-2">
          <div className="flex-1 w-full">
            <div className="text-lg leading-6 font-medium text-gray-900">{announcement && announcement.name}</div>
            <div className="mt-0 text-sm text-gray-500 font-medium">{announcement &&  announcement.description }</div>
            
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-center mt-1 ">
            <EditButton
              editElement={() => editAnnouncements(announcement)}
            />
            <DeleteButton
              deleteElement={() => handleDeleteModal(announcement)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

