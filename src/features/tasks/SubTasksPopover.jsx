import { Badge, List, Popover, ThemeIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

const SubTasksPopover = ({ subtasks = [] }) => {
  const [commentPopoverOpened, { open: openCommentPopover, close: closeCommentPopover }] = useDisclosure(false);

  if (subtasks.length === 0) return <Badge>-</Badge>;

  return (
    <Popover opened={commentPopoverOpened}>
      <Popover.Target>
        <Badge onMouseEnter={openCommentPopover} onMouseLeave={closeCommentPopover}>
          {subtasks?.filter((st) => st.isCompleted).length || 0} / {subtasks?.length || 0}
        </Badge>
      </Popover.Target>

      <Popover.Dropdown>
        <List size="xs" spacing={6} center>
          {subtasks.map((subtask) => (
            <List.Item
              key={subtask._id}
              icon={
                <ThemeIcon variant="light" size={"xs"} color={subtask.isCompleted ? "dimmed" : "teal"}>
                  {subtask.isCompleted ? <IconCheck size={14} /> : <IconAlertCircle size={14} />}
                </ThemeIcon>
              }
              c={subtask.isCompleted ? "dimmed" : "teal"}
            >
              {subtask.isCompleted ? <s>{subtask.title}</s> : subtask.title}
            </List.Item>
          ))}
        </List>
      </Popover.Dropdown>
    </Popover>
  );
};

export default SubTasksPopover;
