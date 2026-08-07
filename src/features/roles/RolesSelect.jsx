import { Loader } from "@mantine/core";
import { useGetAllRolesQuery } from "src/api/role";
import Select from "src/components/Select";

const RolesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const roles = useGetAllRolesQuery(queryObject);

  return (
    <Select
      data={roles.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      rightSection={roles.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(roles.isError && { disabled: true, placeholder: "Error loading roles" })}
    />
  );
};

export default RolesSelect;
