import { Stack } from "@mantine/core";
import AddRoleModalButton from "./AddRoleModalButton";
import RolesTable from "./RolesTable";

const Roles = () => {
  return (
    <Stack>
      <AddRoleModalButton />

      <RolesTable />
    </Stack>
  );
};

export default Roles;
