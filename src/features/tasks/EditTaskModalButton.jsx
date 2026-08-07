import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditTaskModal from "./EditTaskModal";

const EditTaskModalButton = ({ task }) => {
  const [editTaskModalOpened, { open: openEditTaskModal, close: closeEditTaskModal }] = useDisclosure(false);

  return (
    <CanAccess resource="task" action="update">
      <EditTaskModal isOpen={editTaskModalOpened} onClose={closeEditTaskModal} task={task} />

      <ActionIcon color="yellow" onClick={openEditTaskModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditTaskModalButton;
