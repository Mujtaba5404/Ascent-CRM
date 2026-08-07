import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import Select from "src/components/Select";
import ROLE_IDS from "src/constants/ROLE_IDS";

const AccountManagersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const accountManagers = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.ACCOUNT_MANAGER },
  });

  return (
    <Select
      data={accountManagers.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      rightSection={accountManagers.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(accountManagers.isError && {
        disabled: true,
        placeholder: "Error loading account managers",
      })}
    />
  );
};

export default AccountManagersSelect;
