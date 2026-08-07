import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import AddClientModal from "./AddClientModal";

const AddClientModalButton = () => {
  const [addClientModalOpened, { open: openAddClientModal, close: closeAddClientModal }] = useDisclosure(false);

  return (
    <CanAccess resource="client" action="create">
      <AddClientModal isOpen={addClientModalOpened} onClose={closeAddClientModal} />

      <Button onClick={openAddClientModal} leftSection={<IconPlus size={18} />}>
        Add client
      </Button>
    </CanAccess>
  );
};

export default AddClientModalButton;
