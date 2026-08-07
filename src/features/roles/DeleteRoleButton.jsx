import { useDeleteRoleMutation } from "src/api/role";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteRoleButton = ({ roleId }) => {
  return <DeleteItemButton resource="role" label="role" mutationHook={useDeleteRoleMutation} itemId={roleId} />;
};

export default DeleteRoleButton;
