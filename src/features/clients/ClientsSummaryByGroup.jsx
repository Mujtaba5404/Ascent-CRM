import { Badge, Loader, Select, SimpleGrid, Stack, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconFiles, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetClientsSummaryByGroupQuery } from "src/api/client";
import GridTable from "src/components/GridTable";
import Placeholder from "src/components/Placeholder";
import useFilters from "src/hooks/useFilters";
import formatAmount from "src/utils/formatAmount";
import formatNumber from "src/utils/formatNumber";

const GROUPS = [
  { label: "Companies", value: "company" },
  { label: "Brands", value: "brand" },
  { label: "Categories", value: "category" },
  { label: "Account Managers", value: "user" },
];

const INITIAL_FILTERS = { createdAt: [dayjs().utc().startOf("month").toDate(), dayjs().utc().endOf("month").toDate()] };

const RenderHeaderCell = ({ cell }) => {
  return (
    <GridTable.Cell py={0}>
      <Stack gap={1}>
        <Badge fullWidth color={cell.color} radius={0}>
          {cell.title}
        </Badge>

        <SimpleGrid cols={3} spacing={1}>
          <Badge fullWidth color={cell.color} radius={0}>
            #
          </Badge>
          <Badge fullWidth color={cell.color} radius={0}>
            %
          </Badge>
          <Badge fullWidth color={cell.color} radius={0}>
            $
          </Badge>
        </SimpleGrid>
      </Stack>
    </GridTable.Cell>
  );
};

const RenderBodyCell = ({ cell }) => {
  return (
    <GridTable.Cell>
      <SimpleGrid cols={3} spacing={0}>
        <Text fz={"inherit"}>{formatNumber(cell.count)}</Text>
        <Text fz={"inherit"}>{`${cell.percentage}%`}</Text>
        <Text fz={"inherit"}>{formatAmount(cell.worth, { notation: "compact" })}</Text>
      </SimpleGrid>
    </GridTable.Cell>
  );
};

const ClientsSummaryByGroup = () => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });
  const { filters } = useFilters(INITIAL_FILTERS);

  const [group, setGroup] = useState(GROUPS[1].value);

  const { data, isLoading, isError, isSuccess, error } = useGetClientsSummaryByGroupQuery({ group, query: { ...globalFilters, ...filters } });
  const total = { count: data?.totalCount || 0, percentage: 100, worth: data?.totalWorth || 0 };

  if (isLoading) return <Loader />;

  if (isError) return <Placeholder title={error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  if (isSuccess && !data?.totalGroups) return <Placeholder title={"No data to display"} icon={<IconFiles size={50} />} />;

  return (
    <Stack gap={0}>
      <GridTable isSticky={false}>
        <GridTable.Header>
          <GridTable.Row>
            <GridTable.Cell bd={0} py={0}>
              <Select data={GROUPS} value={group} onChange={setGroup} radius={0} styles={{ root: { height: "100%" }, wrapper: { height: "100%" }, input: { height: "100%" } }} />
            </GridTable.Cell>
            {data?.statusWise.map((status) => (
              <RenderHeaderCell key={status._id} cell={status} />
            ))}
            <RenderHeaderCell cell={{ title: "total", color: "gray" }} />
          </GridTable.Row>
        </GridTable.Header>

        <GridTable.Body>
          {data?.groupWise.map((group) => (
            <GridTable.Row key={group._id}>
              <GridTable.Cell>{group.title}</GridTable.Cell>
              {group.statusWise.map((status) => (
                <RenderBodyCell key={status._id} cell={status} />
              ))}
              <RenderBodyCell cell={group} />
            </GridTable.Row>
          ))}
        </GridTable.Body>

        <GridTable.Footer>
          <GridTable.Row>
            <GridTable.Cell>total</GridTable.Cell>
            {data?.statusWise.map((status) => (
              <RenderBodyCell key={status._id} cell={status} />
            ))}
            <RenderBodyCell cell={total} />
          </GridTable.Row>
        </GridTable.Footer>
      </GridTable>

      <Text size="xs" c={"dimmed"} ta={"right"} mt={4}>
        * Hover on cells to check partial refunds/chargebacks
      </Text>
    </Stack>
  );
};

export default ClientsSummaryByGroup;
