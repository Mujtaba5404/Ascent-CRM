import { Loader } from "@mantine/core";
import { upperFirst, useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";
import ROLE_IDS from "src/constants/ROLE_IDS";

const MarketingExecutivesMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const marketingExecutives = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.MARKETING_EXECUTIVE },
  });

  return (
    <MultiSelect
      data={marketingExecutives.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      placeholder={upperFirst("select marketing executives")}
      rightSection={marketingExecutives.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(marketingExecutives.isError && {
        disabled: true,
        placeholder: "Error loading marketing executives",
      })}
    />
  );
};

export default MarketingExecutivesMultiSelect;
