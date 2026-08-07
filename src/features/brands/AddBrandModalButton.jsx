import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import AddBrandModal from "./AddBrandModal";

const AddBrandModalButton = () => {
  const [addBrandModalOpened, { open: openAddBrandModal, close: closeAddBrandModal }] = useDisclosure(false);

  return (
    <CanAccess resource="brand" action="create">
      <AddBrandModal isOpen={addBrandModalOpened} onClose={closeAddBrandModal} />

      <Button leftSection={<IconPlus size={18} />} onClick={openAddBrandModal}>
        Add a brand
      </Button>
    </CanAccess>
  );
};

export default AddBrandModalButton;
