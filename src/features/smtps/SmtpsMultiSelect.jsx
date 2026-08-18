import { Loader } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import MultiSelect from "src/components/MultiSelect";

const SmtpsMultiSelect = ({
  multiSelectProps = {},
  queryObject = {},
}) => {
  const Smtps = useGetAllMarketingPlatformsQuery();

  return (
    <MultiSelect
      data={Smtps.data?.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      searchable
      nothingFoundMessage={upperFirst("no results found")}
      placeholder={upperFirst("select Smtps")}
      rightSection={Smtps.isLoading && <Loader size={18} />}
      {...(Smtps.isError && {
        disabled: true,
        placeholder: "Error loading smtps",
      })}
      {...multiSelectProps}
    />
  );
};

export default SmtpsMultiSelect;
