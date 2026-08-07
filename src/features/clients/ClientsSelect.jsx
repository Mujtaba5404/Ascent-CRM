import { Loader } from "@mantine/core";
import { useGetAllClientsQuery } from "src/api/client";
import Select from "src/components/Select";

const ClientsSelect = ({ selectProps = {}, queryObject = {} }) => {
  const clients = useGetAllClientsQuery({ query: queryObject });

  return (
    <Select
      data={clients.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      rightSection={clients.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(clients.isError && { disabled: true, placeholder: "Error loading clients" })}
    />
  );
};

export default ClientsSelect;
