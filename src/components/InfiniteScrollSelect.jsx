import { ActionIcon, CheckIcon, Combobox, Group, InputBase, Loader, ScrollArea, useCombobox } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconArrowDown } from "@tabler/icons-react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import api from "src/api";

const InfiniteScrollSelect = ({ apiEndpoint = "", params = {}, selectLabel = "", selectValue = "" }) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [selectedOption, setSelectedOption] = useState({});
  const [value, setValue] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 200);

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

  const scrollAreaRef = useRef(null);
  const [isScrollEnd, setIsScrollEnd] = useState(false);

  const onScrollPositionChange = () => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      const { clientHeight, scrollHeight, scrollTop } = scrollArea;
      const atBottom = clientHeight + scrollTop >= scrollHeight;

      setIsScrollEnd(atBottom);
    }
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(option) => {
        setSelectedOption(option);
        setValue(option[selectValue]);
        setSearch(option[selectLabel]);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          value={search}
          onChange={(e) => {
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
            setSearch(e.currentTarget.value);
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            combobox.closeDropdown();
            setSearch(selectedOption[selectLabel] || "");
          }}
          rightSection={data.isLoading ? <Loader size={18} /> : <Combobox.Chevron />}
          rightSectionPointerEvents={"none"}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {data.isLoading && <Combobox.Empty>Loading...</Combobox.Empty>}

          {data.isError && <Combobox.Empty>Error fetching data</Combobox.Empty>}

          {data.isSuccess && !data.data.pages[0]?.meta.totalCount && <Combobox.Empty>No results found</Combobox.Empty>}

          {data.isSuccess && !!data.data.pages[0]?.meta.totalCount && (
            <ScrollArea.Autosize mah={230} scrollbarSize={4} viewportRef={scrollAreaRef} onScrollPositionChange={onScrollPositionChange}>
              {data.data.pages.map((page) =>
                page.data.map((option, index) => (
                  <Combobox.Option key={index} value={option} active={value === option[selectValue]}>
                    <Group gap={"xs"} justify={"space-between"}>
                      {option[selectLabel]}

                      {value === option[selectValue] && <CheckIcon size={12} />}
                    </Group>
                  </Combobox.Option>
                )),
              )}

              {data.hasNextPage && isScrollEnd && (
                <ActionIcon
                  size={"sm"}
                  title="Load more"
                  loading={data.isFetchingNextPage}
                  onClick={() => data.fetchNextPage()}
                  mb={"xs"}
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: "0",
                  }}
                >
                  <IconArrowDown size={14} />
                </ActionIcon>
              )}
            </ScrollArea.Autosize>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default InfiniteScrollSelect;
