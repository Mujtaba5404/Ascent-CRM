import { useDeleteTaskMutation } from "src/api/task";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteTaskButton = ({ taskId, redirect = false }) => {
  return <DeleteItemButton resource="task" label="task" mutationHook={useDeleteTaskMutation} itemId={taskId} navigateTo={redirect ? "/tasks" : undefined} />;
};

export default DeleteTaskButton;
