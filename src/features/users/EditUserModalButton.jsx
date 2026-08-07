import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditUserModal from "./EditUserModal";

const EditUserModalButton = ({ user }) => {
  const [editUserModalOpened, { open: openEditUserModal, close: closeEditUserModal }] = useDisclosure(false);

  return (
    <CanAccess resource="user" action="update">
      <EditUserModal isOpen={editUserModalOpened} onClose={closeEditUserModal} user={user} />

      <ActionIcon color="yellow" onClick={openEditUserModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditUserModalButton;
