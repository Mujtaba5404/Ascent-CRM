import { Loader } from "@mantine/core";
import { upperFirst, useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";
import ROLE_IDS from "src/constants/ROLE_IDS";

const FrontSellersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const frontSellers = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.FRONT_SELLER },
  });

  return (
    <MultiSelect
      data={frontSellers.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      placeholder={upperFirst("select front sellers")}
      rightSection={frontSellers.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(frontSellers.isError && { disabled: true, placeholder: "Error loading front sellers" })}
    />
  );
};

export default FrontSellersMultiSelect;
