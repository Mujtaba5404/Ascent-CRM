import { useDeleteProjectMutation } from "src/api/project";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteProjectButton = ({ projectId, redirect = false }) => {
  return <DeleteItemButton resource="project" label="project" mutationHook={useDeleteProjectMutation} itemId={projectId} navigateTo={redirect ? "/projects" : undefined} />;
};

export default DeleteProjectButton;
