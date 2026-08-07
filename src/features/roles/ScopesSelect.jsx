import { Loader } from "@mantine/core";
import { useGetAllScopesQuery } from "src/api/role";
import Select from "src/components/Select";

const ScopesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const scopes = useGetAllScopesQuery(queryObject);

  return (
    <Select
      data={scopes.data}
      tt="capitalize"
      selectLabel="label"
      selectValue="value"
      rightSection={scopes.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(scopes.isError && { disabled: true, placeholder: "Error loading scopes" })}
    />
  );
};

export default ScopesSelect;
