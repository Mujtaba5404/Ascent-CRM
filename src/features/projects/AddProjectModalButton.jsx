import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import AddProjectModal from "./AddProjectModal";

const AddProjectModalButton = () => {
  const [addProjectModalOpened, { open: openAddProjectModal, close: closeAddProjectModal }] = useDisclosure(false);

  return (
    <CanAccess resource="project" action="create">
      <AddProjectModal isOpen={addProjectModalOpened} onClose={closeAddProjectModal} />

      <Button onClick={openAddProjectModal} leftSection={<IconPlus size={18} />}>
        Add project
      </Button>
    </CanAccess>
  );
};

export default AddProjectModalButton;
