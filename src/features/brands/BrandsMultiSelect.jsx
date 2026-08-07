import { Loader } from "@mantine/core";
import { upperFirst, useLocalStorage } from "@mantine/hooks";
import { useGetAllBrandsQuery } from "src/api/brand";
import MultiSelect from "src/components/MultiSelect";

const BrandsMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const brands = useGetAllBrandsQuery({ query: { ...globalFilters, ...queryObject } });

  return (
    <MultiSelect
      data={brands.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      placeholder={upperFirst("select brands")}
      rightSection={brands.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(brands.isError && { disabled: true, placeholder: "Error loading brands" })}
    />
  );
};

export default BrandsMultiSelect;
