import { Button, Group } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import dayjs from "dayjs";
import ExportButton from "src/components/ExportButton";
import AddOrderModalButton from "src/features/orders/AddOrderModalButton";
import useFilters from "src/hooks/useFilters";
import TabbedLayout from "src/layouts/TabbedLayout";

const INITIAL_FILTERS = { createdAt: [dayjs().utc().startOf("month").toDate(), dayjs().utc().endOf("month").toDate()] };

const OrdersLayout = () => {
  const { filters, setFilters, resetFilters } = useFilters();

  return (
    <TabbedLayout
      tabs={[
        {
          value: "summary",
          label: "Summary",
          path: "summary",
          permission: { resource: "order", action: "read" },
        },
        {
          value: "orders",
          label: "Orders",
          permission: { resource: "order", action: "read" },
        },
      ]}
      rightSlots={{
        orders: (
          <Group>
            {Object.keys(filters).length > 0 && (
              <Button color="red" onClick={() => resetFilters()}>
                Clear filters
              </Button>
            )}
            <ExportButton title="Export" apiEndpoint="/orders/export" params={filters} />
            <AddOrderModalButton />
          </Group>
        ),
        summary: <DatePickerInput type="range" placeholder="Pick date" clearable value={filters?.createdAt || INITIAL_FILTERS.createdAt} onChange={(value) => setFilters({ createdAt: value })} />,
      }}
    />
  );
};

export default OrdersLayout;
