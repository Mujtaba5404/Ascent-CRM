import { ActionIcon } from "@mantine/core";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import PICKLIST_SCOPE from "src/constants/PICKLIST_SCOPE";
import { usePicklists } from "src/context/PicklistContext";

const EditPicklistModalButton = ({ picklist }) => {
  const { scope, resource, openEditModal } = usePicklists();

  return (
    <CanAccess resource={scope === PICKLIST_SCOPE.RESOURCE ? resource : "picklist"} action="update">
      <ActionIcon onClick={() => openEditModal(picklist)}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditPicklistModalButton;
