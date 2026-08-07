import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEye, IconMessagePlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDeleteClientMutation } from "src/api/client";
import CanAccess from "src/components/CanAccess";
import DeleteItemButton from "src/components/DeleteItemButton";
import AddCommentModal from "src/features/comments/AddCommentModal";
import EditClientModal from "./EditClientModal";

const ClientsTableRowMenu = ({ client, compact = false }) => {
  const [addCommentModalOpened, { open: openAddCommentModal, close: closeAddCommentModal }] = useDisclosure(false);
  const [editClientModalOpened, { open: openEditClientModal, close: closeEditClientModal }] = useDisclosure(false);

  return (
    <>
      <AddCommentModal isOpen={addCommentModalOpened} onClose={closeAddCommentModal} resource={"Client"} resourceId={client._id} />
      <EditClientModal isOpen={editClientModalOpened} onClose={closeEditClientModal} client={client} compact={compact} />

      <Menu position="bottom-end">
        <Menu.Target>
          <ActionIcon>
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <CanAccess resource="client" action="read">
            <Menu.Item component={Link} to={`/clients/${client._id}`} leftSection={<IconEye size={18} />}>
              View
            </Menu.Item>
          </CanAccess>

          <CanAccess resource="client" action="update">
            <Menu.Item leftSection={<IconPencil size={18} />} onClick={openEditClientModal}>
              Edit
            </Menu.Item>
          </CanAccess>

          <CanAccess resource="comment" action="create">
            <Menu.Item leftSection={<IconMessagePlus size={18} />} onClick={openAddCommentModal}>
              Add comment
            </Menu.Item>
          </CanAccess>

          <Menu.Divider />

          <DeleteItemButton resource="client" label="client" mutationHook={useDeleteClientMutation} itemId={client._id}>
            <Menu.Item color="red" leftSection={<IconTrash size={18} />} onClick={(e) => e.stopPropagation()}>
              Delete
            </Menu.Item>
          </DeleteItemButton>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ClientsTableRowMenu;
