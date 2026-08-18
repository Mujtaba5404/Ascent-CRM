import { Button, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import ExportButton from "src/components/ExportButton";
import AddProjectModalButton from "src/features/projects/AddProjectModalButton";
import useFilters from "src/hooks/useFilters";
import TabbedLayout from "src/layouts/TabbedLayout";

const INITIAL_FILTERS = { createdAt: [dayjs().utc().startOf("month").toDate(), dayjs().utc().endOf("month").toDate()] };

const ProjectsLayout = () => {
  const { filters, setFilters, resetFilters } = useFilters();

  return (
    <TabbedLayout
      tabs={[
        // {
        //   value: "summary",
        //   label: "Summary",
        //   path: "summary",
        //   permission: { resource: "client", action: "read" },
        // },
        {
          value: "projects",
          label: "Projects",
          permission: { resource: "project", action: "read" },
        },
      ]}
      rightSlots={{
        projects: (
          <Group>
            {Object.keys(filters).length > 0 && (
              <Button color="red" onClick={() => resetFilters()}>
                Clear filters
              </Button>
            )}
            <ExportButton title="Export" apiEndpoint="/projects/export" params={filters} />
            <AddProjectModalButton />
          </Group>
        ),
        summary: <DatePickerInput type="range" placeholder="Pick date" clearable value={filters?.createdAt || INITIAL_FILTERS.createdAt} onChange={(value) => setFilters({ createdAt: value })} />,
      }}
    />
  );
};

export default ProjectsLayout;
