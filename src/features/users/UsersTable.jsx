import { Badge, TextInput } from "@mantine/core";
import { useGetUsersWithPaginationQuery } from "src/api/user";
import BadgesPopover from "src/components/BadgesPopover";
import PaginatedTable from "src/components/PaginatedTable";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import CompaniesMultiSelect from "src/features/companies/CompaniesMultiSelect";
import RolesMultiSelect from "src/features/roles/RolesMultiSelect";
import useFilters from "src/hooks/useFilters";
import capitalizeLetters from "src/utils/capitalizeLetters";
import UsersTableRowActions from "./UsersTableRowActions";

const DEFAULT_COLUMNS = (filters, setFilters) => [
  {
    accessor: "name",
    width: 175,
    textAlign: "center",
    sortable: true,
    filter: <TextInput size="xs" placeholder="Search name" value={filters.name} onChange={(e) => setFilters({ name: e.target.value })} />,
    filtering: filters?.name,
    render: (row) => capitalizeLetters(row.name || "-"),
  },
  {
    accessor: "email",
    width: 325,
    textAlign: "center",
    ellipsis: true,
    sortable: true,
    filter: <TextInput size="xs" placeholder="Search email" value={filters.email} onChange={(e) => setFilters({ email: e.target.value })} />,
    filtering: filters?.email,
    render: (row) => row?.email || "-",
  },
  {
    accessor: "companies",
    width: 225,
    textAlign: "center",
    filter: (
      <CompaniesMultiSelect
        multiSelectProps={{
          size: "xs",
          value: filters.companies || [],
          onChange: (value) => setFilters({ companies: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.companies?.length > 0,
    render: (row) => <BadgesPopover items={row?.companies?.map((company) => company.title)} maxVisible={1} />,
  },
  {
    accessor: "brands",
    width: 225,
    textAlign: "center",
    filter: (
      <BrandsMultiSelect
        multiSelectProps={{
          size: "xs",
          value: filters.brands || [],
          onChange: (value) => setFilters({ brands: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.brands?.length > 0,
    render: (row) => <BadgesPopover items={row?.brands?.map((brand) => brand.title)} maxVisible={1} />,
  },
  {
    accessor: "roles",
    width: 225,
    textAlign: "center",
    filter: (
      <RolesMultiSelect
        multiSelectProps={{
          size: "xs",
          value: filters.roles || [],
          onChange: (value) => setFilters({ roles: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.roles?.length > 0,
    render: (row) => <BadgesPopover items={row?.roles?.map((role) => role.title)} maxVisible={1} />,
  },
  {
    accessor: "isActive",
    width: 125,
    textAlign: "center",
    render: (row) => <Badge color={row.isActive ? "teal" : "red"}>{row.isActive ? "active" : "inactive"}</Badge>,
  },
  {
    accessor: "actions",
    textAlign: "center",
    render: (row) => <UsersTableRowActions user={row} />,
  },
];

const UsersTable = ({ query, hideColumns = [] }) => {
  const { filters, setFilters } = useFilters({});

  return <PaginatedTable queryHook={useGetUsersWithPaginationQuery} columns={DEFAULT_COLUMNS(filters, setFilters)} queryParams={{ ...filters, ...query }} hideColumns={hideColumns} />;
};

export default UsersTable;
