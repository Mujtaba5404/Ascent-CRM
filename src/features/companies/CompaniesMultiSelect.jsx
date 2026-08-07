import { Loader } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllCompaniesQuery } from "src/api/company";
import MultiSelect from "src/components/MultiSelect";

const CompaniesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const companies = useGetAllCompaniesQuery({ query: queryObject });

  return (
    <MultiSelect
      data={companies.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      placeholder={upperFirst("select companies")}
      rightSection={companies.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(companies.isError && { disabled: true, placeholder: "Error loading companies" })}
    />
  );
};

export default CompaniesMultiSelect;
