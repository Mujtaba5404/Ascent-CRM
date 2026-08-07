import { useLocalStorage } from "@mantine/hooks";
import CompaniesMultiSelect from "./CompaniesMultiSelect";

const GlobalCompanySelect = () => {
  const [globalFilters, setGlobalFilters, removeGlobalFilters] = useLocalStorage({
    key: "globalFilters",
    defaultValue: {},
  });

  const handleGlobalFilters = (value) => {
    if (!!value) {
      setGlobalFilters({ company: value });
    } else {
      removeGlobalFilters();
    }
  };

  return <CompaniesMultiSelect multiSelectProps={{ value: globalFilters.company || [], onChange: handleGlobalFilters }} />;
};

export default GlobalCompanySelect;
