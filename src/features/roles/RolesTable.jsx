import { Badge, TextInput } from "@mantine/core";
import { useGetRolesWithPaginationQuery } from "src/api/role";
import PaginatedTable from "src/components/PaginatedTable";
import useFilters from "src/hooks/useFilters";
import capitalizeLetters from "src/utils/capitalizeLetters";
import RolesTableRowActions from "./RolesTableRowActions";

const DEFAULT_COLUMNS = (filters, setFilters) => [
  {
    accessor: "title",
    textAlign: "center",
    sortable: true,
    filter: <TextInput size="xs" placeholder="Search title" value={filters.title} onChange={(e) => setFilters({ title: e.target.value })} />,
    filtering: filters?.title,
    render: (row) => capitalizeLetters(row.title),
  },
  { accessor: "scope", textAlign: "center", render: (row) => <Badge>{row.scope}</Badge> },
  {
    accessor: "indexPath",
    textAlign: "center",
    filter: <TextInput size="xs" placeholder="Search index path" value={filters.indexPath} onChange={(e) => setFilters({ indexPath: e.target.value })} />,
    filtering: filters?.indexPath,
    render: (row) => row?.indexPath || "-",
  },
  {
    accessor: "actions",
    textAlign: "center",
    render: (row) => <RolesTableRowActions role={row} />,
  },
];

const RolesTable = ({ query, hideColumns = [] }) => {
  const { filters, setFilters } = useFilters({});

  return <PaginatedTable queryHook={useGetRolesWithPaginationQuery} columns={DEFAULT_COLUMNS(filters, setFilters)} queryParams={{ ...filters, ...query }} hideColumns={hideColumns} />;
};

export default RolesTable;
