import { Loader } from "@mantine/core";
import { upperFirst, useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";
import ROLE_IDS from "src/constants/ROLE_IDS";

const AccountManagersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const accountManagers = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.ACCOUNT_MANAGER },
  });

  return (
    <MultiSelect
      data={accountManagers.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      placeholder={upperFirst("select account managers")}
      rightSection={accountManagers.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(accountManagers.isError && {
        disabled: true,
        placeholder: "Error loading account managers",
      })}
    />
  );
};

export default AccountManagersMultiSelect;
