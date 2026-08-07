import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMessagePlus } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import AddCommentModal from "./AddCommentModal";

const AddCommentModalButton = ({ resource, resourceId }) => {
  const [addCommentModalOpened, { open: openAddCommentModal, close: closeAddCommentModal }] = useDisclosure(false);

  return (
    <CanAccess resource="comment" action="create">
      <AddCommentModal isOpen={addCommentModalOpened} onClose={closeAddCommentModal} resource={resource} resourceId={resourceId} />

      <ActionIcon onClick={openAddCommentModal}>
        <IconMessagePlus size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default AddCommentModalButton;
