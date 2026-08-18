import { Button, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import ExportButton from "src/components/ExportButton";
import AddClientModalButton from "src/features/clients/AddClientModalButton";
import useFilters from "src/hooks/useFilters";
import TabbedLayout from "src/layouts/TabbedLayout";

const INITIAL_FILTERS = { createdAt: [dayjs().utc().startOf("month").toDate(), dayjs().utc().endOf("month").toDate()] };

const ClientsLayout = () => {
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
          value: "clients",
          label: "Clients",
          permission: { resource: "client", action: "read" },
        },
      ]}
      rightSlots={{
        clients: (
          <Group>
            {Object.keys(filters).length > 0 && (
              <Button color="red" onClick={() => resetFilters()}>
                Clear filters
              </Button>
            )}
            <ExportButton title="Export" apiEndpoint="/clients/export" params={filters} />
            <AddClientModalButton />
          </Group>
        ),
        summary: <DatePickerInput type="range" placeholder="Pick date" clearable value={filters?.createdAt || INITIAL_FILTERS.createdAt} onChange={(value) => setFilters({ createdAt: value })} />,
      }}
    />
  );
};

export default ClientsLayout;
