import { Avatar, Grid, Group, Loader, Stack, Text, Tooltip } from "@mantine/core";
import { IconCards, IconReceipt2, IconRepeat, IconUser, IconUserDollar, IconX } from "@tabler/icons-react";
import { truncate } from "lodash";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "src/api/order";
import BadgesPopover from "src/components/BadgesPopover";
import InfoList from "src/components/InfoList";
import Placeholder from "src/components/Placeholder";
import { SERVER_URL } from "src/constants/SERVER_URL";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import DeleteOrderButton from "./DeleteOrderButton";
import EditOrderModalButton from "./EditOrderModalButton";

const createInfoListItems = (order) => [
  { icon: <IconUser />, label: "client", children: order?.client?.title },
  { icon: <Avatar src={`${SERVER_URL}${order?.company?.imgUrl}`} size={24} />, label: "company", children: order?.company?.title },
  { icon: <Avatar src={`${SERVER_URL}${order.brand.imgUrl}`} size={24} />, label: "brand", children: order.brand.title },
  { icon: <IconCards />, label: "services", children: <BadgesPopover items={order?.services?.map((service) => service.title)} /> },
  { icon: <IconRepeat />, label: "order status", children: order?.status?.title },
  { icon: <IconReceipt2 />, label: "order amount", children: formatAmount(order?.amount) },
  { icon: <IconUserDollar />, label: "payment date", children: formatDate(order?.paymentDate) },
];

const OrderDetails = () => {
  const { id } = useParams();

  const order = useGetOrderByIdQuery(id);

  if (order.isLoading) return <Loader />;

  if (order.isError) return <Placeholder title={order.error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  const infoList = createInfoListItems(order.data);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
        <Stack>
          <Group>
            <Avatar alt={order.data.client.title} size={"xl"}>
              {getAbbreviation(order.data.client.title)}
            </Avatar>

            <Stack gap={4}>
              <Group gap={"xs"}>
                <Tooltip label={order.data.client.title} tt={"capitalize"}>
                  <Text size="lg" fw={700} tt={"capitalize"}>
                    {truncate(order.data.client.title, { length: 18 })}
                  </Text>
                </Tooltip>

                <EditOrderModalButton order={order.data} />

                <DeleteOrderButton orderId={order.data._id} redirect />
              </Group>

              <Text size="xs" fw={500} mt={6}>
                <Text component="span" c={"dimmed"}>
                  Order ID:
                </Text>
                {` ${order.data.orderId}`}
              </Text>

              <Text size="xs" fw={500}>
                <Text component="span" c={"dimmed"}>
                  Created on:
                </Text>
                {` ${formatDate(order.data.createdAt)}`}
              </Text>
            </Stack>
          </Group>

          <InfoList>
            {infoList.map((item, index) => (
              <InfoList.Item key={index} icon={item.icon} label={item.label}>
                {item.children}
              </InfoList.Item>
            ))}
          </InfoList>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default OrderDetails;
