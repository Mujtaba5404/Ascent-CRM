import { Combobox, Loader, Select } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "src/api";

const getNothingMessage = (data) => {
  if (data.isLoading) return "Loading...";

  if (data.isError) return "Error fetching data";

  if (!data.isLoading && !data.isError) return "No results found";
};

const AsyncSelect = ({ apiEndpoint = "", params = {}, selectLabel = "", selectValue = "", ...props }) => {
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const query = useQuery({
    queryKey: [apiEndpoint, params, debouncedSearch],
    queryFn: () =>
      api
        .get(apiEndpoint, {
          params: { ...params, query: { ...params.query, [selectLabel]: debouncedSearch } },
        })
        .then(({ data }) => data),
  });

  useEffect(() => {
    if (query.data) {
      setOptions(
        query.data?.data.map((option) => ({
          label: option[selectLabel],
          value: option[selectValue],
        })),
      );
    }
  }, [query.isSuccess]);

  return (
    <Select
      data={options}
      searchValue={search}
      onSearchChange={setSearch}
      rightSection={query.isLoading ? <Loader size={18} /> : <Combobox.Chevron />}
      nothingFoundMessage={getNothingMessage(query)}
      {...props}
    />
  );
};

export default AsyncSelect;
