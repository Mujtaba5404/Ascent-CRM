import { Avatar, Badge, Button, Group, Stack, Text, TextInput, UnstyledButton } from "@mantine/core";
import AvatarGroup from "src/components/AvatarGroup";
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
import useFilters from "src/hooks/useFilters";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatDate from "src/utils/formatDate";
import formatPhone from "src/utils/formatPhone";
import getAbbreviation from "src/utils/getAbbreviation";
import CompaniesMultiSelect from "../companies/CompaniesMultiSelect";
import PicklistsTagsInput from "../picklists/components/PicklistsTagsInput";
import UsersMultiSelect from "../users/UsersMultiSelect";
import ProjectsTableRowMenu from "./ProjectsTableRowMenu";
import BadgesPopover from "src/components/BadgesPopover";
import formatAmount from "src/utils/formatAmount";

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
    filter: <TextInput size="xs" placeholder="Search by name/email" value={filters.clientInfo} onChange={(e) => setFilters({ clientInfo: e.target.value })} />,
    filtering: filters?.clientInfo,
    render: (row) => (
      <UnstyledButton component={Link} to={`/projects/${row._id}`}>
        <Group wrap="nowrap" gap={"xs"}>
          <Avatar size={"sm"} src={`${SERVER_URL}${row.brand.imgUrl}`} alt={row.brand.title} title={row.brand.title} radius={"sm"} p={2} bg={"white"}>
            {getAbbreviation(row.brand.title)}
          </Avatar>
          <div>
            <Text size="sm" tt="capitalize">
              {row.client?.title}
            </Text>
            <Text size="xs" c={"dimmed"} title={row.email}>
              {truncate(row.client?.email, { length: 28 })}
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
    render: (row) => formatPhone(row?.client?.phone) || "-",
  },
  {
    accessor: "services",
    width: 200,
    ellipsis: true,
    textAlign: "center",
    filter: (
      <PicklistsMultiSelect
        queryObject={{ resource: "Order", field: "services" }}
        multiSelectProps={{
          size: "xs",
          value: filters.services || [],
          onChange: (value) => setFilters({ services: value }),
        }}
      />
    ),

    filtering: filters?.services?.length > 0,
    render: (row) => <BadgesPopover items={row.services?.map((service) => capitalizeLetters(service?.title || ""))} />,
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
    accessor:"amount",
    width:150,
    textAlign:"center",
    render: (row) => formatAmount(row.amount),
  },
  {
    accessor: "status",
    width: 150,
    textAlign: "center",
    filter: (
      <PicklistsMultiSelect
        queryObject={{ resource: "Project", field: "status" }}
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
  // {
  //   accessor: "startDate",
  //   width: 120,
  //   textAlign: "center",
  //   sortable: true,
  //   render: (row) => formatDate(row.startDate),
  // },
  // {
  //   accessor: "endDate",
  //   width: 120,
  //   textAlign: "center",
  //   sortable: true,
  //   render: (row) => formatDate(row.endDate),
  // },
  {
    accessor: "startDate",
    title: "Start Date",
    width: 160,
    textAlign: "center",
    sortable: true,
    filter: ({ close }) => (
      <Stack gap="xs">
        <DatePicker size="xs" value={filters.startDate} onChange={(value) => setFilters({ startDate: value })} />

        <Button
          size="xs"
          onClick={() => {
            setFilters({ startDate: null });
            close();
          }}
        >
          Clear
        </Button>
      </Stack>
    ),
    filtering: !!filters.startDate,
    render: (row) => formatDate(row.startDate),
  },
  {
    accessor: "endDate",
    title: "End Date",
    width: 160,
    textAlign: "center",
    sortable: true,
    filter: ({ close }) => (
      <Stack gap="xs">
        <DatePicker size="xs" value={filters.endDate} onChange={(value) => setFilters({ endDate: value })} />

        <Button
          size="xs"
          onClick={() => {
            setFilters({ endDate: null });
            close();
          }}
        >
          Clear
        </Button>
      </Stack>
    ),
    filtering: !!filters.endDate,
    render: (row) => formatDate(row.endDate),
  },
  {
    accessor: "type",
    width: 150,
    textAlign: "center",
    filter: (
      <PicklistsMultiSelect
        queryObject={{ resource: "Project", field: "type" }}
        multiSelectProps={{
          size: "xs",
          placeholder: "Select type",
          value: filters.type || [],
          onChange: (value) => setFilters({ type: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.type?.length,
    render: (row) => <Badge color={row?.type?.color}>{row?.type?.title}</Badge>,
  },
  {
    accessor: "assignees",
    title: "Assigned To",
    width: 180,
    textAlign: "center",
    filter: (
      <UsersMultiSelect
        multiSelectProps={{
          size: "xs",
          value: filters.assignees || [],
          onChange: (value) => setFilters({ assignees: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.assignees?.length,
    render: (row) => (
      <Group w="100%" justify="center">
        <AvatarGroup items={row.assignees || []} getLabel={(i) => i.name || i.fullName || i.email} />
      </Group>
    ),
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
