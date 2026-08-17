import { Avatar, Grid, Group, Loader, Paper, Stack, Tabs, Text, Tooltip } from "@mantine/core";
import { IconAt, IconCalendarEvent, IconNote, IconPhone, IconUserDollar, IconX } from "@tabler/icons-react";
import { truncate } from "lodash";
import { useParams } from "react-router-dom";
import { useGetClientByIdQuery } from "src/api/client";
import InfoList from "src/components/InfoList";
import Placeholder from "src/components/Placeholder";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CommentBox from "src/features/comments/CommentBox";
import AddTaskModalButton from "src/features/tasks/AddTaskModalButton";
import TasksTable from "src/features/tasks/TasksTable";
import classes from "src/index.module.css";
import capitalizeLetters from "src/utils/capitalizeLetters";
import formatAmount from "src/utils/formatAmount";
import formatDate from "src/utils/formatDate";
import formatPhone from "src/utils/formatPhone";
import getAbbreviation from "src/utils/getAbbreviation";
import AddProjectModalButton from "../projects/AddProjectModalButton";
import ProjectsTable from "../projects/ProjectsTable";
import DeleteClientButton from "./DeleteClientButton";
import EditClientModalButton from "./EditClientModalButton";

const createInfoListItems = (client) => [
  {
    icon: <IconAt />,
    label: "email",
    children: (
      <Text size="sm" tt={"lowercase"}>
        {client.email}
      </Text>
    ),
  },
  { icon: <IconPhone />, label: "phone", children: formatPhone(client.phone) },
  { icon: <Avatar src={`${SERVER_URL}${client.brand.imgUrl}`} size={24} />, label: "brand", children: client.brand.title },
  { icon: <IconCalendarEvent />, label: "lastOrderDate", children: formatDate(client?.projectMetrics?.lastOrderDate) },
  { icon: <IconUserDollar />, label: "worth", children: formatAmount(client?.projectMetrics?.totalAmount || 0) },
];

const ClientDetails = () => {
  const { id } = useParams();

  const client = useGetClientByIdQuery(id);

  if (client.isLoading) return <Loader />;

  if (client.isError) return <Placeholder title={client.error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  const infoList = createInfoListItems(client.data);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
        <Stack>
          <Group>
            <Avatar alt={client.data.title} size={"xl"}>
              {getAbbreviation(client.data.title)}
            </Avatar>

            <Stack gap={4}>
              <Group gap={"xs"}>
                <Tooltip label={client.data.title} tt={"capitalize"}>
                  <Text size="lg" fw={700} tt={"capitalize"}>
                    {truncate(client.data.title, { length: 15 })}
                  </Text>
                </Tooltip>

                <EditClientModalButton client={client.data} />

                <DeleteClientButton clientId={client.data._id} redirect />
              </Group>

              <Text size="xs" fw={500} mt={6}>
                <Text component="span" c={"dimmed"}>
                  Client ID:
                </Text>
                {` ${client.data.clientId}`}
              </Text>

              <Text size="xs" fw={500}>
                <Text component="span" c={"dimmed"}>
                  Created on:
                </Text>
                {` ${formatDate(client.data.createdAt)}`}
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

      <Grid.Col span={{ base: 12, md: 8, xl: 9 }}>
        <Stack>
          <Paper p={"md"}>
            <Group gap={8} align="flex-end" mb={"xs"}>
              <IconNote className={classes.icon} />

              <Text size="xs" c={"dimmed"} fw={500}>
                description
              </Text>
            </Group>

            <Text size="sm" fw={500}>
              {capitalizeLetters(client.data.description || "No additional description")}
            </Text>
          </Paper>

          <Tabs variant="pills" defaultValue="projects">
            <Paper p={4} mb={"md"}>
              <Tabs.List grow>
                <Tabs.Tab value="projects" tt={"capitalize"}>
                  projects
                </Tabs.Tab>

                {/* <Tabs.Tab value="tasks" tt={"capitalize"}>
                  tasks
                </Tabs.Tab> */}

                <Tabs.Tab value="comments" tt={"capitalize"}>
                  comments
                </Tabs.Tab>
              </Tabs.List>
            </Paper>

            <Tabs.Panel value="projects">
              <Stack>
                <AddProjectModalButton clientInfo={{ brand: client.data.brand._id, client: client.data._id }} />

                <ProjectsTable query={{ client: id }} hideColumns={["client", "brand", "accountManager"]} />
              </Stack>
            </Tabs.Panel>

            {/* <Tabs.Panel value="tasks">
              <Stack>
                <AddTaskModalButton clientInfo={{ brand: client.data.brand._id, client: client.data._id }} />

                <TasksTable query={{ client: id }} hideColumns={["client"]} />
              </Stack>
            </Tabs.Panel> */}

            <Tabs.Panel value="comments">
              <CommentBox resource="Client" resourceId={id} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ClientDetails;
