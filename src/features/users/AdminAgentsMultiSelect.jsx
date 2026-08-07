import { Loader } from "@mantine/core";
import { upperFirst, useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";
import ROLE_IDS from "src/constants/ROLE_IDS";

const AdminAgentsMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const adminAgents = useGetAllUsersQuery({ query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.ADMIN_AGENT } });

  return (
    <MultiSelect
      data={adminAgents.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      placeholder={upperFirst("select admin agents")}
      rightSection={adminAgents.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(adminAgents.isError && {
        disabled: true,
        placeholder: "Error loading admin agents",
      })}
    />
  );
};

export default AdminAgentsMultiSelect;
