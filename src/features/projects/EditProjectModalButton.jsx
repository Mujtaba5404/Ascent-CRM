import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditProjectModal from "./EditProjectModal";

const EditProjectModalButton = ({ project }) => {
  const [editProjectModalOpened, { open: openEditProjectModal, close: closeEditProjectModal }] = useDisclosure(false);

  return (
    <CanAccess resource="project" action="update">
      <EditProjectModal isOpen={editProjectModalOpened} onClose={closeEditProjectModal} project={project} />

      <ActionIcon color="yellow" onClick={openEditProjectModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditProjectModalButton;
