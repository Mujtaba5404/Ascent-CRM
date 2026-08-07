import { Loader } from "@mantine/core";
import { upperFirst, useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import MultiSelect from "src/components/MultiSelect";
import ROLE_IDS from "src/constants/ROLE_IDS";

const FleetManagersMultiSelect = ({ multiSelectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const fleetManagers = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.FLEET_MANAGER },
  });

  return (
    <MultiSelect
      data={fleetManagers.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      placeholder={upperFirst("select fleet managers")}
      rightSection={fleetManagers.isLoading && <Loader size={18} />}
      {...multiSelectProps}
      {...(fleetManagers.isError && {
        disabled: true,
        placeholder: "Error loading fleet managers",
      })}
    />
  );
};

export default FleetManagersMultiSelect;
