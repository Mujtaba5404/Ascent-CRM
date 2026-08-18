import { Loader } from "@mantine/core";
import { useGetAllBasecampQuery } from "src/api/basecamp";
import Select from "src/components/Select";

const BaseCampSelect = ({ selectProps = {}, queryObject = {} }) => {
  const basecamps = useGetAllBasecampQuery({ query: queryObject });
  const data = (basecamps.data || []).map((item) => ({...item, title: item.company?.title, accountId: item.accountId, selectTitle: `${item.company?.title || ""} - ${item.accountId || ""}`}));

  return (
    <Select
      data={data}
      tt="capitalize"
      selectLabel="selectTitle"
      selectValue="_id"
      rightSection={basecamps.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(basecamps.isError && {
        disabled: true,
        placeholder: "Error loading basecamps",
      })}
    />
  );
};

export default BaseCampSelect;
