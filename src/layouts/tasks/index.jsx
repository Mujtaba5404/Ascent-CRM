import { Button, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import ExportButton from "src/components/ExportButton";
import AddTaskModalButton from "src/features/tasks/AddTaskModalButton";
import useFilters from "src/hooks/useFilters";
import TabbedLayout from "src/layouts/TabbedLayout";

const INITIAL_FILTERS = { createdAt: [dayjs().utc().startOf("month").toDate(), dayjs().utc().endOf("month").toDate()] };

const TasksLayout = () => {
  const { filters, setFilters, resetFilters } = useFilters();

  return (
    <TabbedLayout
      tabs={[
        {
          value: "summary",
          label: "Summary",
          path: "summary",
          permission: { resource: "task", action: "read" },
        },
        {
          value: "tasks",
          label: "Tasks",
          permission: { resource: "task", action: "read" },
        },
      ]}
      rightSlots={{
        tasks: (
          <Group>
            {Object.keys(filters).length > 0 && (
              <Button color="red" onClick={() => resetFilters()}>
                Clear filters
              </Button>
            )}
            <ExportButton title="Export" apiEndpoint="/tasks/export" params={filters} />
            <AddTaskModalButton />
          </Group>
        ),
        summary: <DatePickerInput type="range" placeholder="Pick date" clearable value={filters?.createdAt || INITIAL_FILTERS.createdAt} onChange={(value) => setFilters({ createdAt: value })} />,
      }}
    />
  );
};

export default TasksLayout;
