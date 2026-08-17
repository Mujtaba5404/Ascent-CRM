import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import CanAccess from "src/components/CanAccess";
import AddBaseCampModal from "./AddBaseCampModal";

const AddBaseCampModalButton = () => {
  const [addBaseCampmodalOpened, { open: openAddBaseCampModal, close: closeAddBaseCampModal }] = useDisclosure(false);

  return (
    <CanAccess resource="basecamp" action="create">
      <AddBaseCampModal isOpen={addBaseCampmodalOpened} onClose={closeAddBaseCampModal} />

      <AddButton title="create basecamp" subtitle="add a new basecamp" onClick={openAddBaseCampModal} />
    </CanAccess>
  );
};

export default AddBaseCampModalButton;
