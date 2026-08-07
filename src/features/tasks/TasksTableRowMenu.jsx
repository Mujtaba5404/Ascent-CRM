import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDeleteTaskMutation } from "src/api/task";
import CanAccess from "src/components/CanAccess";
import DeleteItemButton from "src/components/DeleteItemButton";
import EditTaskModal from "./EditTaskModal";

const TasksTableRowMenu = ({ task, compact = false }) => {
  const [editTaskOpened, { open: openEditTask, close: closeEditTask }] = useDisclosure(false);

  return (
    <>
      <EditTaskModal isOpen={editTaskOpened} onClose={closeEditTask} task={task} compact={compact} />

      <Menu position="bottom-end">
        <Menu.Target>
          <ActionIcon>
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <CanAccess resource="task" action="read">
            <Menu.Item component={Link} to={`/tasks/${task._id}`} leftSection={<IconEye size={18} />}>
              View
            </Menu.Item>
          </CanAccess>

          <CanAccess resource="task" action="update">
            <Menu.Item leftSection={<IconPencil size={18} />} onClick={openEditTask}>
              Edit
            </Menu.Item>
          </CanAccess>

          <Menu.Divider />

          <DeleteItemButton resource="task" label="task" mutationHook={useDeleteTaskMutation} itemId={task._id}>
            <Menu.Item color="red" leftSection={<IconTrash size={18} />} onClick={(e) => e.stopPropagation()}>
              Delete
            </Menu.Item>
          </DeleteItemButton>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default TasksTableRowMenu;
