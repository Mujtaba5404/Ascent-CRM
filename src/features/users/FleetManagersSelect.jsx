import { Loader } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetAllUsersQuery } from "src/api/user";
import Select from "src/components/Select";
import ROLE_IDS from "src/constants/ROLE_IDS";

const FleetManagersSelect = ({ selectProps = {}, queryObject = {} }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });

  const fleetManagers = useGetAllUsersQuery({
    query: { ...globalFilters, ...queryObject, roles: ROLE_IDS.FLEET_MANAGER },
  });

  return (
    <Select
      data={fleetManagers.data}
      tt="capitalize"
      selectLabel="name"
      selectValue="_id"
      rightSection={fleetManagers.isLoading && <Loader size={18} />}
      {...selectProps}
      {...(fleetManagers.isError && {
        disabled: true,
        placeholder: "Error loading fleet managers",
      })}
    />
  );
};

export default FleetManagersSelect;
