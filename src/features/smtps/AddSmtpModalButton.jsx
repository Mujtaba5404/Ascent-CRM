import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import CanAccess from "src/components/CanAccess";
import AddSmtpModal from "./AddSmtpModal";

const AddSmtpModalButton = () => {
  const [addSmtpModalOpened, { open: openAddSmtpModal, close: closeAddSmtpModal }] = useDisclosure(false);

  return (
    <CanAccess modelName="smtp" action="post">
      <AddSmtpModal isOpen={addSmtpModalOpened} onClose={closeAddSmtpModal} />

      <AddButton title="create smtp" subtitle="add a new smtp" onClick={openAddSmtpModal} />
    </CanAccess>
  );
};

export default AddSmtpModalButton;
