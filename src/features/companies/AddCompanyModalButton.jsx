import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import CanAccess from "src/components/CanAccess";
import AddCompanyModal from "./AddCompanyModal";

const AddCompanyModalButton = () => {
  const [addCompanymodalOpened, { open: openAddCompanyModal, close: closeAddCompanyModal }] = useDisclosure(false);

  return (
    <CanAccess resource="company" action="create">
      <AddCompanyModal isOpen={addCompanymodalOpened} onClose={closeAddCompanyModal} />

      <AddButton title="create company" subtitle="add a new company" onClick={openAddCompanyModal} />
    </CanAccess>
  );
};

export default AddCompanyModalButton;
