import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import AddOrderModal from "./AddOrderModal";

const AddOrderModalButton = ({ clientInfo }) => {
  const [addOrderModalOpened, { open: openAddOrderModal, close: closeAddOrderModal }] = useDisclosure(false);

  return (
    <CanAccess resource="order" action="create">
      <AddOrderModal isOpen={addOrderModalOpened} onClose={closeAddOrderModal} clientInfo={clientInfo} />

      <Button onClick={openAddOrderModal} leftSection={<IconPlus size={18} />}>
        Add order
      </Button>
    </CanAccess>
  );
};

export default AddOrderModalButton;
