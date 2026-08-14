import { Avatar, Badge, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import { truncate } from "lodash";
import { useGetOrdersWithPaginationQuery } from "src/api/order";
import BadgesPopover from "src/components/BadgesPopover";
import PaginatedTable from "src/components/PaginatedTable";
import { SERVER_URL } from "src/constants/SERVER_URL";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import PicklistsMultiSelect from "src/features/picklists/components/PicklistsMultiSelect";
import useFilters from "src/hooks/useFilters";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import CompaniesMultiSelect from "../companies/CompaniesMultiSelect";
import OrdersTableRowMenu from "./OrdersTableRowMenu";
import CommentPopover from "../comments/CommentPopover";

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
    accessor: "orderId",
    width: 250,
    textAlign: "center",
    sortable: true,
    filter: <TextInput size="xs" placeholder="Search orders by Id" value={filters.orderId} onChange={(e) => setFilters({ orderId: e.target.value })} />,
    filtering: filters?.orderId,
    render: (row) => <Badge>{row?.orderId}</Badge>,
  },
  {
    accessor: "client",
    width: 250,
    filter: <TextInput size="xs" placeholder="Search by name/email/phone" value={filters.orderInfo} onChange={(e) => setFilters({ orderInfo: e.target.value })} />,
    filtering: filters?.orderInfo,
    render: (row) => (
      <Group wrap="nowrap" gap={"xs"}>
        <Avatar size={"sm"} src={`${SERVER_URL}${row.brand.imgUrl}`} alt={row.brand.title} title={row.brand.title} radius={"sm"} p={2} bg={"white"}>
          {getAbbreviation(row.brand.title)}
        </Avatar>
        <div>
          <Text size="sm" tt="capitalize">
            {row.client.title}
          </Text>
          <Text size="xs" c={"dimmed"} title={row.client.email}>
            {truncate(row.client.email, { length: 30 })}
          </Text>
        </div>
      </Group>
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
    accessor: "amount",
    width: 125,
    textAlign: "center",
    sortable: true,
    filter: <TextInput size="xs" placeholder="Search by amount" value={filters.amount} onChange={(e) => setFilters({ amount: e.target.value })} />,
    filtering: filters?.amount,
    render: (row) => formatAmount(row.amount),
  },
  {
    accessor: "status",
    textAlign: "center",
    width: 160,
    filter: (
      <Stack gap={"xs"}>
        <PicklistsMultiSelect
          queryObject={{ resource: "Order", field: "status" }}
          multiSelectProps={{
            size: "xs",
            placeholder: "Select order status",
            value: filters.status || [],
            onChange: (value) => setFilters({ status: value }),
            comboboxProps: { withinPortal: false },
          }}
        />
      </Stack>
    ),
    filtering: filters.status?.length,
    render: (row) => (
      <Stack gap={0} tt={"capitalize"} title={`${row.status?.title}`}>
        <Text size="sm">{row.status?.title}</Text>
      </Stack>
    ),
  },
  {
    accessor: "services",
    width: 180,
    textAlign: "center",
    filter: <TextInput size="xs" placeholder="Search by services" value={filters.services} onChange={(e) => setFilters({ services: e.target.value })} />,
    filtering: filters?.services,
    render: (row) => <BadgesPopover items={row.services?.map((service) => service.title)} />,
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
    render: (row) => <OrdersTableRowMenu order={row} compact />,
  },
];

const OrdersTable = ({ query, hideColumns = [] }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });
  const { filters, setFilters } = useFilters({});

  return (
    <PaginatedTable queryHook={useGetOrdersWithPaginationQuery} columns={DEFAULT_COLUMNS(filters, setFilters)} queryParams={{ ...globalFilters, ...filters, ...query }} hideColumns={hideColumns} />
  );
};

export default OrdersTable;
