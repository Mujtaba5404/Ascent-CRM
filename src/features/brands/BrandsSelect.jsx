import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetAllBrandsQuery } from "src/api/brand";
import Select from "src/components/Select";

const BrandsSelect = ({ selectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const brands = useGetAllBrandsQuery({ query: { ...globalFilters, ...queryObject } });

  return (
    <Select
      data={brands.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      rightSection={brands.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(brands.isError && { disabled: true, placeholder: "Error loading brands" })}
    />
  );
};

export default BrandsSelect;
