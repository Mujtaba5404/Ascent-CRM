import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import Select from "src/components/Select";

const UsersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const users = useGetAllUsersQuery({ query: { ...globalFilters, ...queryObject } });

  return (
    <Select
      data={users.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      rightSection={users.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(users.isError && { disabled: true, placeholder: "Error loading users" })}
    />
  );
};

export default UsersSelect;
