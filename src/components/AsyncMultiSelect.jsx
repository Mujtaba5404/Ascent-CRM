import { Combobox, Loader, MultiSelect } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import api from "src/api";

const getNothingMessage = (data) => {
  if (data.isLoading) return "Loading...";

  if (data.isError) return "Error fetching data";

  if (data.isSuccess && !data.data.pages[0]?.meta.totalCount) return "No results found";
};

const AsyncMultiSelect = ({ apiEndpoint = "", params = {}, selectLabel = "", selectValue = "", ...props }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 200);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const data = useInfiniteQuery({
    queryKey: [apiEndpoint, params, debouncedSearch],
    queryFn: ({ pageParam: page = 1 }) =>
      api
        .get(apiEndpoint, {
          params: { ...params, query: { ...params.query, [selectLabel]: debouncedSearch }, page },
        })
        .then(({ data }) => data),
    getNextPageParam: ({ meta }) => (meta.page < meta.totalPages ? parseInt(meta.page) + 1 : undefined),
  });

  const options = data.data?.pages.reduce((acc, page) => [...acc, ...page.data.map((option) => ({ label: option[selectLabel], value: option[selectValue] }))], []) || [];

  // useEffect(() => {
  //   const currentSelectedValues = selectedValues.map((value) => options.find((option) => option[selectValue] === value)).filter(Boolean);
  //   setSelectedValues(currentSelectedValues);
  // }, [data.data]);

  const handleValuesChange = (values) => {
    setSelectedValues(values);

    const _selectedOptions = options.map((option) => (values.includes(option.value) ? option : false)).filter(Boolean);
    setSelectedOptions(_selectedOptions);
  };

  return (
    <MultiSelect
      data={options}
      value={selectedValues}
      onChange={handleValuesChange}
      searchValue={search}
      onSearchChange={setSearch}
      rightSection={data.isLoading ? <Loader size={18} /> : <Combobox.Chevron />}
      nothingFoundMessage={getNothingMessage(data)}
      {...props}
    />
  );
};

export default AsyncMultiSelect;
