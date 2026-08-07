import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import Select from "src/components/Select";
import ROLE_IDS from "src/constants/ROLE_IDS";

const AdminAgentsSelect = ({ selectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const adminAgents = useGetAllUsersQuery({ query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.ADMIN_AGENT } });

  return (
    <Select
      data={adminAgents.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      rightSection={adminAgents.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(adminAgents.isError && {
        disabled: true,
        placeholder: "Error loading admin agents",
      })}
    />
  );
};

export default AdminAgentsSelect;
