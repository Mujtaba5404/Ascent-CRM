import { Avatar, Badge, Button, Group, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import { truncate } from "lodash";
import { Link } from "react-router-dom";
import { useGetProjectsWithPaginationQuery } from "src/api/project";
import PaginatedTable from "src/components/PaginatedTable";
import { SERVER_URL } from "src/constants/SERVER_URL";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import CommentPopover from "src/features/comments/CommentPopover";
import PicklistsMultiSelect from "src/features/picklists/components/PicklistsMultiSelect";
import AccountManagersMultiSelect from "src/features/users/AccountManagersMultiSelect";
import useFilters from "src/hooks/useFilters";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import ProjectsTableRowMenu from "./ProjectsTableRowMenu";
import BadgesPopover from "src/components/BadgesPopover";
import CompaniesMultiSelect from "../companies/CompaniesMultiSelect";
import formatPhone from "src/utils/formatPhone";
import PicklistsTagsInput from "../picklists/components/PicklistsTagsInput";

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
    accessor: "client",
    width: 250,
    filter: <TextInput size="xs" placeholder="Search by name/email/phone" value={filters.clientInfo} onChange={(e) => setFilters({ clientInfo: e.target.value })} />,
    filtering: filters?.clientInfo,
    render: (row) => (
      <UnstyledButton component={Link} to={`/clients/${row.client._id}`}>
        <Group wrap="nowrap" gap={"xs"}>
          <Avatar size={"sm"} src={`${SERVER_URL}${row.brand.imgUrl}`} alt={row.brand.title} title={row.brand.title} radius={"sm"} p={2} bg={"white"}>
            {getAbbreviation(row.brand.title)}
          </Avatar>
          <div>
            <Text size="sm" tt="capitalize">
              {row.client?.title}
            </Text>
            <Text size="xs" c={"dimmed"} title={row.client?.email}>
              {truncate(row.client?.email, { length: 30 })}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    ),
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
    accessor: "services",
    width: 175,
    ellipsis: true,
    textAlign: "center",

    filter: (
      <PicklistsTagsInput
        queryObject={{ resource: "Order", field: "services" }}
        tagsInputProps={{
          size: "xs",
          value: filters.services || [],
          onChange: (value) => setFilters({ services: value }),
        }}
      />
    ),
    filtering: filters?.services?.length > 0,
    render: (row) => (row?.services?.length ? row.services.map(capitalizeLetters).join(", ") : "-"),
  },
  {
    accessor: "company",
    width: 175,
    ellipsis: true,
    textAlign: "center",
    filter: <CompaniesMultiSelect multiSelectProps={{ size: "xs", value: filters.company || [], onChange: (value) => setFilters({ company: value }), comboboxProps: { withinPortal: false } }} />,
    filtering: filters?.company,
    render: (row) => capitalizeLetters(row?.company?.title || "-"),
  },
  {
    accessor: "brand",
    width: 225,
    filter: (
      <BrandsMultiSelect
        multiSelectProps={{
          size: "xs",
          value: filters.brand || [],
          onChange: (value) => setFilters({ brand: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.brand?.length,
    render: (row) => (
      <Group wrap="nowrap" gap={"xs"}>
        <Avatar size={"sm"} src={`${SERVER_URL}${row.brand.imgUrl}`} alt={row.brand.title} title={row.brand.title} radius={"sm"} p={2} bg={"white"}>
          {getAbbreviation(row.brand.title)}
        </Avatar>
        <Text size="sm" tt="capitalize">
          {row.brand.title}
        </Text>
      </Group>
    ),
  },
  {
    accessor: "status",
    width: 150,
    textAlign: "center",
    filter: (
      <PicklistsMultiSelect
        queryObject={{ resource: "Client", field: "status" }}
        multiSelectProps={{
          size: "xs",
          placeholder: "Select status",
          value: filters.status || [],
          onChange: (value) => setFilters({ status: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.status?.length,
    render: (row) => <Badge color={row?.status?.color}>{row?.status?.title}</Badge>,
  },
  {
    accessor: "startDate",
    width: 120,
    textAlign: "center",
    sortable: true,
    render: (row) => formatDate(row.startDate),
  },
  {
    accessor: "endDate",
    width: 120,
    textAlign: "center",
    sortable: true,
    render: (row) => formatDate(row.endDate),
  },
  {
    accessor: "assignees",
    width: 180,
    textAlign: "center",
    render: (row) => <BadgesPopover items={row.assignees?.map((assignee) => capitalizeLetters(assignee.name))} />,
  },
  {
    accessor: "type",
    width: 150,
    textAlign: "center",
    render: (row) => <Badge variant="light">{row?.type?.title}</Badge>,
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
    render: (row) => <ProjectsTableRowMenu project={row} compact />,
  },
];

const ProjectsTable = ({ query, hideColumns = [] }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });
  const { filters, setFilters } = useFilters({});

  return (
    <PaginatedTable queryHook={useGetProjectsWithPaginationQuery} columns={DEFAULT_COLUMNS(filters, setFilters)} queryParams={{ ...globalFilters, ...filters, ...query }} hideColumns={hideColumns} />
  );
};

export default ProjectsTable;
