import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import AddTaskModal from "./AddTaskModal";

const AddTaskModalButton = ({ clientInfo }) => {
  const [addTaskModalOpened, { open: openAddTaskModal, close: closeAddTaskModal }] = useDisclosure(false);

  return (
    <CanAccess resource="task" action="create">
      <AddTaskModal isOpen={addTaskModalOpened} onClose={closeAddTaskModal} clientInfo={clientInfo} />

      <Button onClick={openAddTaskModal} leftSection={<IconPlus size={18} />}>
        Add task
      </Button>
    </CanAccess>
  );
};

export default AddTaskModalButton;
