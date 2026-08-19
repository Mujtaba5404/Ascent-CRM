import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import AddSmtpModal from "./AddSmtpModal";
import CanAccess from "src/components/CanAccess";

const AddSmtpModalButton = () => {
  const [addSmtpModalOpened, { open: openAddSmtpModal, close: closeAddSmtpModal }] = useDisclosure(false);

  return (
    <CanAccess resource="smtp" action="create">
      <AddSmtpModal isOpen={addSmtpModalOpened} onClose={closeAddSmtpModal} />

      <AddButton title="create smtp" subtitle="add a new smtp" onClick={openAddSmtpModal} />
    </CanAccess>
  );
};

export default AddSmtpModalButton;
