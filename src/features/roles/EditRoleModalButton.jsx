import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditRoleModal from "./EditRoleModal";

const EditRoleModalButton = ({ role }) => {
  const [editRoleModalOpened, { open: openEditRoleModal, close: closeEditRoleModal }] = useDisclosure(false);

  return (
    <CanAccess resource="role" action="update">
      <EditRoleModal isOpen={editRoleModalOpened} onClose={closeEditRoleModal} role={role} />

      <ActionIcon onClick={openEditRoleModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};
export default EditRoleModalButton;
