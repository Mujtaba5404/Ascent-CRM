import { useDisclosure } from "@mantine/hooks";
import AddButton from "src/components/AddButton";
import CanAccess from "src/components/CanAccess";
import AddUserModal from "./AddUserModal";

const AddUserModalButton = () => {
  const [addUserModalOpened, { open: openAddUserModal, close: closeAddUserModal }] = useDisclosure(false);

  return (
    <CanAccess resource="user" action="create">
      <AddUserModal isOpen={addUserModalOpened} onClose={closeAddUserModal} />

      <AddButton title="create user" subtitle="add a new user" onClick={openAddUserModal} />
    </CanAccess>
  );
};

export default AddUserModalButton;
