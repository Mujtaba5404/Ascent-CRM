import { Loader, Select, SimpleGrid, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconFiles, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useState } from "react";
import { useGetOrdersSummaryByGroupQuery } from "src/api/order";
import GridTable from "src/components/GridTable";
import Placeholder from "src/components/Placeholder";
import useFilters from "src/hooks/useFilters";
import formatAmount from "src/utils/formatAmount";
import formatNumber from "src/utils/formatNumber";

const GROUPS = [
  { label: "Companies", value: "company" },
  { label: "Brands", value: "brand" },
  { label: "Account Managers", value: "user" },
];

const INITIAL_FILTERS = { createdAt: [dayjs().utc().startOf("month").toDate(), dayjs().utc().endOf("month").toDate()] };

const OrdersSummaryByGroup = () => {
  const [globalFilters] = useLocalStorage({ key: "globalFilters", getInitialValueInEffect: false });
  const { filters } = useFilters(INITIAL_FILTERS);

  const [group, setGroup] = useState(GROUPS[1].value);

  const { data, isLoading, isError, isSuccess, error } = useGetOrdersSummaryByGroupQuery({ group, query: { ...globalFilters, ...filters } });

  if (isLoading) return <Loader />;

  if (isError) return <Placeholder title={error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  if (isSuccess && !data?.totalGroups) return <Placeholder title={"No data to display"} icon={<IconFiles size={50} />} />;

  return (
    <GridTable isSticky={false}>
      <GridTable.Header>
        <GridTable.Row>
          <GridTable.Cell bd={0} py={0}>
            <Select data={GROUPS} value={group} onChange={setGroup} radius={0} styles={{ root: { height: "100%" }, wrapper: { height: "100%" }, input: { height: "100%" } }} />
          </GridTable.Cell>
          {data.paymentTypeWise.map((paymentType) => (
            <GridTable.Cell key={paymentType._id}>{paymentType.title}</GridTable.Cell>
          ))}
          <GridTable.Cell>Total</GridTable.Cell>
        </GridTable.Row>

        <GridTable.Row>
          <GridTable.Cell></GridTable.Cell>
          {data.paymentTypeWise.map((paymentType) => (
            <GridTable.Cell key={paymentType._id}>
              <SimpleGrid cols={2} spacing={0}>
                <Text fz={"inherit"}>count</Text>
                <Text fz={"inherit"}>amount</Text>
              </SimpleGrid>
            </GridTable.Cell>
          ))}
          <GridTable.Cell>
            <SimpleGrid cols={2} spacing={0}>
              <Text fz={"inherit"}>count</Text>
              <Text fz={"inherit"}>amount</Text>
            </SimpleGrid>
          </GridTable.Cell>
        </GridTable.Row>
      </GridTable.Header>

      <GridTable.Body>
        {data.groupWise.map((group) => (
          <GridTable.Row key={group._id}>
            <GridTable.Cell>{group.title}</GridTable.Cell>
            {group.paymentTypeWise.map((paymentType) => (
              <GridTable.Cell key={paymentType._id}>
                <SimpleGrid cols={2} spacing={0}>
                  <Text fz={"inherit"}>{formatNumber(paymentType.count)}</Text>
                  <Text fz={"inherit"}>{formatAmount(paymentType.amount)}</Text>
                </SimpleGrid>
              </GridTable.Cell>
            ))}
            <GridTable.Cell>
              <SimpleGrid cols={2} spacing={0}>
                <Text fz={"inherit"}>{formatNumber(group.count)}</Text>
                <Text fz={"inherit"}>{formatAmount(group.amount)}</Text>
              </SimpleGrid>
            </GridTable.Cell>
          </GridTable.Row>
        ))}
      </GridTable.Body>

      <GridTable.Footer>
        <GridTable.Row>
          <GridTable.Cell>Total</GridTable.Cell>
          {data.paymentTypeWise.map((paymentType, index) => (
            <GridTable.Cell key={index}>
              <SimpleGrid cols={2} spacing={0}>
                <Text fz={"inherit"}>{formatNumber(paymentType.count)}</Text>
                <Text fz={"inherit"}>{formatAmount(paymentType.amount)}</Text>
              </SimpleGrid>
            </GridTable.Cell>
          ))}
          <GridTable.Cell>
            <SimpleGrid cols={2} spacing={0}>
              <Text fz={"inherit"}>{formatNumber(data.totalCount)}</Text>
              <Text fz={"inherit"}>{formatAmount(data.totalAmount)}</Text>
            </SimpleGrid>
          </GridTable.Cell>
        </GridTable.Row>
      </GridTable.Footer>
    </GridTable>
  );
};

export default OrdersSummaryByGroup;
