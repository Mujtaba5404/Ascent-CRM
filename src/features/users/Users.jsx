import { Stack } from "@mantine/core";
import AddUserModalButton from "./AddUserModalButton";
import UsersTable from "./UsersTable";

const Users = () => {
  return (
    <Stack>
      <AddUserModalButton />

      <UsersTable />
    </Stack>
  );
};

export default Users;
