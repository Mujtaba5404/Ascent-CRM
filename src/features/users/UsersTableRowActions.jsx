import { Group } from "@mantine/core";
import EditUserModalButton from "./EditUserModalButton";

const UsersTableRowActions = ({ user }) => {
  return (
    <Group gap={"sm"} justify="center" wrap="nowrap">
      <EditUserModalButton user={user} />
    </Group>
  );
};

export default UsersTableRowActions;
