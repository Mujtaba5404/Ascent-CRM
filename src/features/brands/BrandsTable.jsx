import { Avatar, Badge, Group, Stack, Text, TextInput } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { useGetBrandsWithPaginationQuery } from "src/api/brand";
import PaginatedTable from "src/components/PaginatedTable";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CompaniesMultiSelect from "src/features/companies/CompaniesMultiSelect";
import useFilters from "src/hooks/useFilters";
import getAbbreviation from "src/utils/getAbbreviation";
import BrandsTableRowActions from "./BrandsTableRowActions";

const DEFAULT_COLUMNS = (filters, setFilters) => [
  {
    accessor: "title",
    filter: <TextInput size="xs" placeholder="Search title" value={filters.title} onChange={(e) => setFilters({ title: e.target.value })} />,
    filtering: filters?.title,
    render: (row) => (
      <Group>
        <Avatar size={"sm"} src={`${SERVER_URL}${row.imgUrl}`} alt={row.title} title={row.title} radius={"sm"} p={2} bg={"white"}>
          {getAbbreviation(row.title)}
        </Avatar>
        <Stack gap={0} justify="flex-start">
          <Text size="sm" fw={500} tt="capitalize">
            {row.title}
          </Text>
          <Text size="xs" c={"dimmed"}>
            {row.acronym}
          </Text>
        </Stack>
      </Group>
    ),
  },
  {
    accessor: "brandUrl",
    textAlign: "center",
    filter: <TextInput size="xs" placeholder="Search brand URL" value={filters.brandUrl} onChange={(e) => setFilters({ brandUrl: e.target.value })} />,
    filtering: filters?.brandUrl,
    render: (row) => row?.brandUrl || "-",
  },
  {
    accessor: "company",
    textAlign: "center",
    filter: (
      <CompaniesMultiSelect
        multiSelectProps={{
          size: "xs",
          value: filters.company || [],
          onChange: (value) => setFilters({ company: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.company?.length > 0,
    render: (row) => <Badge>{row.company.title}</Badge>,
  },
  {
    accessor: "isActive",
    textAlign: "center",
    render: (row) => <Badge color={row.isActive ? "teal" : "red"}>{row.isActive ? "active" : "inactive"}</Badge>,
  },
  {
    accessor: "actions",
    textAlign: "center",
    render: (row) => <BrandsTableRowActions brand={row} />,
  },
];

const BrandsTable = ({ query, hideColumns = [] }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });
  const { filters, setFilters } = useFilters({});

  return (
    <PaginatedTable queryHook={useGetBrandsWithPaginationQuery} columns={DEFAULT_COLUMNS(filters, setFilters)} queryParams={{ ...filters, ...query, ...globalFilters }} hideColumns={hideColumns} />
  );
};

export default BrandsTable;
