import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditOrderModal from "./EditOrderModal";

const EditOrderModalButton = ({ order }) => {
  const [editOrderModalOpened, { open: openEditOrderModal, close: closeEditOrderModal }] = useDisclosure(false);

  return (
    <CanAccess resource="order" action="update">
      <EditOrderModal isOpen={editOrderModalOpened} onClose={closeEditOrderModal} order={order} />

      <ActionIcon color="yellow" onClick={openEditOrderModal}>
        <IconPencil size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditOrderModalButton;
