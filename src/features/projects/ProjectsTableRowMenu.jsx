import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEye, IconMessagePlus, IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDeleteProjectMutation } from "src/api/project";
import CanAccess from "src/components/CanAccess";
import DeleteItemButton from "src/components/DeleteItemButton";
import AddCommentModal from "src/features/comments/AddCommentModal";
import EditProjectModal from "./EditProjectModal";

const ProjectsTableRowMenu = ({ project, compact = false }) => {
  const [addCommentModalOpened, { open: openAddCommentModal, close: closeAddCommentModal }] = useDisclosure(false);
  const [editProjectModalOpened, { open: openEditProjectModal, close: closeEditProjectModal }] = useDisclosure(false);

  return (
    <>
      <AddCommentModal isOpen={addCommentModalOpened} onClose={closeAddCommentModal} resource={"Project"} resourceId={project._id} />
      <EditProjectModal isOpen={editProjectModalOpened} onClose={closeEditProjectModal} project={project} compact={compact} />

      <Menu position="bottom-end">
        <Menu.Target>
          <ActionIcon>
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <CanAccess resource="project" action="read">
            <Menu.Item component={Link} to={`/projects/${project._id}`} leftSection={<IconEye size={18} />}>
              View
            </Menu.Item>
          </CanAccess>

          <CanAccess resource="project" action="update">
            <Menu.Item leftSection={<IconPencil size={18} />} onClick={openEditProjectModal}>
              Edit
            </Menu.Item>
          </CanAccess>

          <CanAccess resource="comment" action="create">
            <Menu.Item leftSection={<IconMessagePlus size={18} />} onClick={openAddCommentModal}>
              Add comment
            </Menu.Item>
          </CanAccess>

          <Menu.Divider />

          <DeleteItemButton resource="project" label="project" mutationHook={useDeleteProjectMutation} itemId={project._id}>
            <Menu.Item color="red" leftSection={<IconTrash size={18} />} onClick={(e) => e.stopPropagation()}>
              Delete
            </Menu.Item>
          </DeleteItemButton>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default ProjectsTableRowMenu;
