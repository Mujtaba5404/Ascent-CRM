import { Avatar, Badge, Button, Group, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { useGetClientsWithPaginationQuery } from "src/api/client";
import PaginatedTable from "src/components/PaginatedTable";
import { SERVER_URL } from "src/constants/SERVER_URL";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import CommentPopover from "src/features/comments/CommentPopover";
import PicklistsMultiSelect from "src/features/picklists/components/PicklistsMultiSelect";
import useFilters from "src/hooks/useFilters";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import CompaniesMultiSelect from "../companies/CompaniesMultiSelect";
import ClientsTableRowMenu from "./ClientsTableRowMenu";
import formatPhone from "src/utils/formatPhone";

const DEFAULT_COLUMNS = (filters, setFilters) => [
  {
    accessor: "createdAt",
    title: "Date",
    width: 120,
    textAlign: "center",
    sortable: true,
    filter: ({ close }) => (
      <Stack gap={"xs"}>
        <DatePicker size="xs" type="range" value={filters.createdAt} onChange={(value) => setFilters({ createdAt: value })} />
        <Button
          size="xs"
          onClick={() => {
            setFilters({ createdAt: [] });
            close();
          }}
        >
          Clear
        </Button>
      </Stack>
    ),
    filtering: filters.createdAt?.length,
    render: (row) => formatDate(row.createdAt),
  },
  {
    accessor: "clientId",
    width: 200,
    textAlign: "center",
    sortable: true,
    filter: <TextInput size="xs" placeholder="Search clients by Id" value={filters.clientId} onChange={(e) => setFilters({ clientId: e.target.value })} />,
    filtering: filters?.clientId,
    render: (row) => <Badge>{row?.clientId}</Badge>,
  },
  {
    accessor: "client",
    width: 250,
    filter: <TextInput size="xs" placeholder="Search by name/email" value={filters.clientInfo} onChange={(e) => setFilters({ clientInfo: e.target.value })} />,
    filtering: filters?.clientInfo,
    render: (row) => (
      <UnstyledButton component={Link} to={`/clients/${row._id}`}>
        <Group wrap="nowrap" gap={"xs"}>
          <Avatar size={"sm"} src={`${SERVER_URL}${row.brand.imgUrl}`} alt={row.brand.title} title={row.brand.title} radius={"sm"} p={2} bg={"white"}>
            {getAbbreviation(row.brand.title)}
          </Avatar>
          <div>
            <Text size="sm" tt="capitalize">
              {row.title}
            </Text>
            <Text size="xs" c={"dimmed"} title={row.email}>
              {truncate(row.email, { length: 30 })}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ),
  },
  {
    accessor: "brand",
    width: 250,
    filter: (
      <Stack gap="xs">
        <CompaniesMultiSelect
          multiSelectProps={{
            size: "xs",
            placeholder: "Select company",
            value: filters.company || [],
            onChange: (value) => setFilters({ company: value, brand: [] }),
            comboboxProps: { withinPortal: false },
          }}
        />
        <BrandsMultiSelect
          queryObject={filters.company?.length ? { company: filters.company } : undefined}
          multiSelectProps={{
            size: "xs",
            placeholder: "Select brand",
            value: filters.brand || [],
            onChange: (value) => setFilters({ brand: value }),
            comboboxProps: { withinPortal: false },
          }}
        />
      </Stack>
    ),
    filtering: filters?.company?.length || filters?.brand?.length,
    render: (row) => (
      <Group wrap="nowrap" gap={"xs"}>
        <Avatar size={"sm"} src={`${SERVER_URL}${row.brand.imgUrl}`} alt={row.brand.title} title={row.brand.title} radius={"sm"} p={2} bg={"white"}>
          {getAbbreviation(row.brand.title)}
        </Avatar>
        <Stack gap={0}>
          <Text size="sm" tt="capitalize">
            {row?.brand?.title || "-"}
          </Text>
          <Text size="xs" c={"dimmed"} tt="capitalize">
            {capitalizeLetters(row?.company?.title || "-")}
          </Text>
        </Stack>
      </Group>
    ),
  },
  {
    accessor: "worth",
    width: 125,
    textAlign: "center",
    render: (row) => formatAmount(row?.orderMetrics?.totalAmount || 0),
  },
  {
    accessor: "phone",
    width: 150,
    textAlign: "center",
    filter: <TextInput size="xs" placeholder="Search clients by phone" value={filters.phone} onChange={(e) => setFilters({ phone: e.target.value })} />,
    filtering: filters?.phone,
    render: (row) => formatPhone(row.phone) || "-",
  },
  {
    accessor: "last comment",
    width: 200,
    textAlign: "center",
    render: (row) => <CommentPopover comment={row.lastComment} />,
  },
  {
    accessor: "menu",
    width: 60,
    textAlign: "center",
    render: (row) => <ClientsTableRowMenu client={row} compact />,
  },
];

const ClientsTable = ({ query, hideColumns = [] }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });
  const { filters, setFilters } = useFilters({});

  return (
    <PaginatedTable queryHook={useGetClientsWithPaginationQuery} columns={DEFAULT_COLUMNS(filters, setFilters)} queryParams={{ ...globalFilters, ...filters, ...query }} hideColumns={hideColumns} />
  );
};

export default ClientsTable;
