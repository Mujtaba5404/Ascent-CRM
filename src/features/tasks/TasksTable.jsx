import { Avatar, Badge, Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useLocalStorage } from "@mantine/hooks";
import { truncate } from "lodash";
import { useGetTasksWithPaginationQuery } from "src/api/task";
import AvatarGroup from "src/components/AvatarGroup";
import PaginatedTable from "src/components/PaginatedTable";
import { SERVER_URL } from "src/constants/SERVER_URL";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import PicklistsMultiSelect from "src/features/picklists/components/PicklistsMultiSelect";
import UsersMultiSelect from "src/features/users/UsersMultiSelect";
import useFilters from "src/hooks/useFilters";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import TasksTableRowMenu from "./TasksTableRowMenu";
import SubTasksPopover from "./SubTasksPopover";
import CommentPopover from "../comments/CommentPopover";
import capitalizeLetters from "src/utils/capitalizeLetters";
import ENUMS from "src/constants/ENUMS";

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
      accessor: "taskId",
      width: 250,
      textAlign: "center",
      sortable: true,
      filter: <TextInput size="xs" placeholder="Search orders by Id" value={filters.taskId} onChange={(e) => setFilters({ taskId: e.target.value })} />,
      filtering: filters?.taskId,
      render: (row) => <Badge>{row?.taskId}</Badge>,
    },
  {
    accessor: "title",
    width: 180,
    ellipsis: true,
    sortable: true,
    filter: <TextInput size="xs" placeholder="Search by title" value={capitalizeLetters(filters.title)} onChange={(e) => setFilters({ title: e.target.value })} />,
    filtering: filters?.title,
    render: (row) => capitalizeLetters(row?.title || "-"),
  },
  {
    accessor: "client",
    width: 250,
    ellipsis: true,
    filter: <TextInput size="xs" placeholder="Search by client name/email" value={filters.clientInfo} onChange={(e) => setFilters({ clientInfo: e.target.value })} />,
    filtering: filters?.clientInfo,
    render: (row) => (
      <Group wrap="nowrap" gap={"xs"}>
        <Avatar size={"sm"} src={`${SERVER_URL}${row.brand.imgUrl}`} alt={row.brand.title} title={row.brand.title} radius={"sm"} p={2} bg={"white"}>
          {getAbbreviation(row.brand.title)}
        </Avatar>
        <div>
          <Text size="sm" fw={500} tt="capitalize">
            {row.client.title}
          </Text>
          <Text size="xs" c={"dimmed"} title={row.client.email}>
            {truncate(row.client.email, { length: 28 })}
          </Text>
        </div>
      </Group>
    ),
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
    accessor: "subTasks",
    width: 125,
    textAlign: "center",
    render: (row) => <SubTasksPopover subtasks={row.subTasks} />,
  },
  {
    accessor: "status",
    width: 150,
    textAlign: "center",
    filter: (
      <PicklistsMultiSelect
        queryObject={{ resource: "Task", field: "status" }}
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
    render: (row) => <Badge color={row.status === ENUMS.TASK.STATUSES.OPEN ? "teal" : "red"}>{row.status}</Badge>,
  },
  {
    accessor: "priority",
    width: 150,
    textAlign: "center",
    filter: (
      <PicklistsMultiSelect
        queryObject={{ resource: "Task", field: "priority" }}
        multiSelectProps={{
          size: "xs",
          placeholder: "Select priority",
          value: filters.priority || [],
          onChange: (value) => setFilters({ priority: value }),
          comboboxProps: { withinPortal: false },
        }}
      />
    ),
    filtering: filters.priority?.length,
    render: (row) => <Badge color={row.priority?.color}>{row.priority?.title}</Badge>,
  },
  // {
  //   accessor: "tags",
  //   title: "Tags",
  //   textAlign: "center",
  //   width: 250,
  //   render: (row) => (
  //     <Group gap={4}>
  //       {row.tags?.length
  //         ? row.tags.map((tag) => (
  //             <Badge key={tag} variant="light">
  //               {tag}
  //             </Badge>
  //           ))
  //         : "-"}
  //     </Group>
  //   ),
  // },
  {
    accessor: "dueDate",
    title: "Due Date",
    width: 130,
    textAlign: "center",
    sortable: true,
    filter: ({ close }) => (
      <Stack gap="xs">
        <DatePicker size="xs" type="range" value={filters.dueDate} onChange={(value) => setFilters({ dueDate: value })} />
        <Button
          size="xs"
          onClick={() => {
            setFilters({ dueDate: [] });
            close();
          }}
        >
          Clear
        </Button>
      </Stack>
    ),
    filtering: filters.dueDate?.length,
    render: (row) => (row.dueDate ? formatDate(row.dueDate) : "-"),
  },

  {
    accessor: "assignees",
    title: "Assigned To",
    width: 175,
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
    render: (row) => <TasksTableRowMenu task={row} compact />,
  },
];

const TasksTable = ({ query, hideColumns = [] }) => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });
  const { filters, setFilters } = useFilters({});

  return (
    <PaginatedTable queryHook={useGetTasksWithPaginationQuery} columns={DEFAULT_COLUMNS(filters, setFilters)} queryParams={{ ...globalFilters, ...filters, ...query }} hideColumns={hideColumns} />
  );
};

export default TasksTable;
