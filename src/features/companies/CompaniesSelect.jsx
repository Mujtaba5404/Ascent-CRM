import { Loader } from "@mantine/core";
import { useGetAllCompaniesQuery } from "src/api/company";
import Select from "src/components/Select";

const CompaniesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const companies = useGetAllCompaniesQuery({ query: queryObject });

  return (
    <Select
      data={companies.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      rightSection={companies.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(companies.isError && { disabled: true, placeholder: "Error loading companies" })}
    />
  );
};

export default CompaniesSelect;
