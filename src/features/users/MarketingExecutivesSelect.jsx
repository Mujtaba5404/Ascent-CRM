import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import Select from "src/components/Select";
import ROLE_IDS from "src/constants/ROLE_IDS";

const MarketingExecutivesSelect = ({ selectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const marketingExecutives = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.MARKETING_EXECUTIVE },
  });

  return (
    <Select
      data={marketingExecutives.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      rightSection={marketingExecutives.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(marketingExecutives.isError && {
        disabled: true,
        placeholder: "Error loading marketing executives",
      })}
    />
  );
};

export default MarketingExecutivesSelect;
