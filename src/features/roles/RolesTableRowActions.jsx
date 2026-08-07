import { Group } from "@mantine/core";
import DeleteRoleButton from "./DeleteRoleButton";
import EditRoleModalButton from "./EditRoleModalButton";

const RolesTableRowActions = ({ role }) => {
  return (
    <Group gap={"sm"} justify="center" wrap="nowrap">
      <EditRoleModalButton role={role} />

      <DeleteRoleButton roleId={role._id} />
    </Group>
  );
};

export default RolesTableRowActions;
