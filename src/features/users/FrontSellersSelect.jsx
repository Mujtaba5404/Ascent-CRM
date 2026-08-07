import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import Select from "src/components/Select";
import ROLE_IDS from "src/constants/ROLE_IDS";

const FrontSellersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const frontSellers = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.FRONT_SELLER },
  });

  return (
    <Select
      data={frontSellers.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      rightSection={frontSellers.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(frontSellers.isError && { disabled: true, placeholder: "Error loading front sellers" })}
    />
  );
};

export default FrontSellersSelect;
