import { Loader } from "@mantine/core";
import { useGetClientsByBrandQuery } from "src/api/client";
import Select from "src/components/Select";

const ClientsByBrandSelect = ({ selectProps = {}, brandId = "" }) => {
  const clientsByBrand = useGetClientsByBrandQuery(brandId);

  return (
    <Select
      data={clientsByBrand.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      capitalizeLabel={false}
      rightSection={clientsByBrand.isLoading && <Loader size={18} />}
      {...(clientsByBrand.isError && { disabled: true, placeholder: "Error loading clients" })}
      {...selectProps}
    />
  );
};

export default ClientsByBrandSelect;
