import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditClientModal from "./EditClientModal";

const EditClientModalButton = ({ client }) => {
  const [editClientModalOpened, { open: openEditClientModal, close: closeEditClientModal }] = useDisclosure(false);

  return (
    <CanAccess resource="client" action="update">
      <EditClientModal isOpen={editClientModalOpened} onClose={closeEditClientModal} client={client} />

      <ActionIcon color="yellow" onClick={openEditClientModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditClientModalButton;
