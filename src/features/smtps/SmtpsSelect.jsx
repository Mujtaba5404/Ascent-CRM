import { Loader } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { useGetAllMarketingPlatformsQuery } from "src/api/marketingPlatform";
import Select from "src/components/Select";

const SmtpsSelect = ({ selectProps = {}, queryObject = {} }) => {
  const Smtps = useGetAllMarketingPlatformsQuery(queryObject);

  return (
    <Select
      data={Smtps.data}
      tt="capitalize"
      selectLabel="title"
      selectValue="_id"
      searchable
      nothingFoundMessage={upperFirst("no results found")}
      placeholder={upperFirst("select smtps")}
      rightSection={Smtps.isLoading && <Loader size={18} />}
      {...(Smtps.isError && {
        disabled: true,
        placeholder: "Error loading smtps",
      })}
      {...selectProps}
    />
  );
};

export default SmtpsSelect;
