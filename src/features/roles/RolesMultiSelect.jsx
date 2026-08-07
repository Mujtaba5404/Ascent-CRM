import { Loader } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllRolesQuery } from "src/api/role";
import MultiSelect from "src/components/MultiSelect";

const RolesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const roles = useGetAllRolesQuery(queryObject);

  return (
    <MultiSelect
      data={roles.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      placeholder={upperFirst("select roles")}
      rightSection={roles.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(roles.isError && { disabled: true, placeholder: "Error loading roles" })}
    />
  );
};

export default RolesMultiSelect;
