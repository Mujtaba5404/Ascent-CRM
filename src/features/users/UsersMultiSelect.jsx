import { Loader } from "@mantine/core";
import { upperFirst, useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";

const UsersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const users = useGetAllUsersQuery({ query: { ...globalFilters, ...queryObject } });

  return (
    <MultiSelect
      data={users.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      placeholder={upperFirst("select Users")}
      rightSection={users.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(users.isError && { disabled: true, placeholder: "Error loading users" })}
    />
  );
};

export default UsersMultiSelect;
