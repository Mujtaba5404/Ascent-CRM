import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditCommentModal from "./EditCommentModal";

const EditCommentModalButton = ({ comment }) => {
  const [editCommentModalOpened, { open: openEditCommentModal, close: closeEditCommentModal }] = useDisclosure(false);

  return (
    <CanAccess resource="comment" action="update">
      <EditCommentModal isOpen={editCommentModalOpened} onClose={closeEditCommentModal} comment={comment} />

      <ActionIcon color="yellow" onClick={openEditCommentModal}>
        <IconPencil size={16} />
      </ActionIcon>
    </CanAccess>
  );
};

export default EditCommentModalButton;
