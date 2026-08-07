import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditCompanyModal from "./EditCompanyModal";

const EditCompanyModalButton = ({ company }) => {
  const [editCompanymodalOpened, { open: openEditCompanyModal, close: closeEditCompanyModal }] = useDisclosure(false);

  return (
    <CanAccess resource="company" action="update">
      <EditCompanyModal isOpen={editCompanymodalOpened} onClose={closeEditCompanyModal} company={company} />

      <ActionIcon onClick={openEditCompanyModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditCompanyModalButton;
