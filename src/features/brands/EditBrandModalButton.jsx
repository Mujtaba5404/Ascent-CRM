import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditBrandModal from "./EditBrandModal";

const EditBrandModalButton = ({ brand }) => {
  const [editBrandModalOpened, { open: openEditBrandModal, close: closeEditBrandModal }] = useDisclosure(false);

  return (
    <CanAccess resource="brand" action="update">
      <EditBrandModal isOpen={editBrandModalOpened} onClose={closeEditBrandModal} brand={brand} />

      <ActionIcon color="yellow" onClick={openEditBrandModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditBrandModalButton;
