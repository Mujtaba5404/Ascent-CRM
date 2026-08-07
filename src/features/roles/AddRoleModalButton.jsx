import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import CanAccess from "src/components/CanAccess";
import AddRoleModal from "./AddRoleModal";

const AddRoleModalButton = () => {
  const [addRoleModalOpened, { open: openAddRoleModal, close: closeAddRoleModal }] = useDisclosure(false);

  return (
    <CanAccess resource="role" action="create">
      <AddRoleModal isOpen={addRoleModalOpened} onClose={closeAddRoleModal} />

      <AddButton title="create role" subtitle="add a new role" onClick={openAddRoleModal} />
    </CanAccess>
  );
};

export default AddRoleModalButton;
