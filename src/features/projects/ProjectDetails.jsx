import { Avatar, Badge, Grid, Group, Loader, Paper, Stack, Tabs, Text, Tooltip } from "@mantine/core";
import { IconBolt, IconNote, IconStatusChange, IconUser, IconX } from "@tabler/icons-react";
import { truncate } from "lodash";
import { useParams } from "react-router-dom";
import { useGetProjectByIdQuery } from "src/api/project";
import InfoList from "src/components/InfoList";
import Placeholder from "src/components/Placeholder";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CommentBox from "src/features/comments/CommentBox";
import AddOrderModalButton from "src/features/orders/AddOrderModalButton";
import OrdersTable from "src/features/orders/OrdersTable";
import AddTaskModalButton from "src/features/tasks/AddTaskModalButton";
import TasksTable from "src/features/tasks/TasksTable";
import classes from "src/index.module.css";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import DeleteProjectButton from "./DeleteProjectButton";
import EditProjectModalButton from "./EditProjectModalButton";

const createInfoListItems = (project) => [
  
  { icon: <Avatar src={`${SERVER_URL}${project?.brand?.imgUrl}`} size={24} />, label: "brand", children: project.brand.title },
  { icon: <IconUser />, label: "client", children: project?.client?.title },
  { icon: <IconBolt />, label: "type", children: <Badge color={project?.type?.color}>{project?.type?.title}</Badge> },
  { icon: <IconStatusChange />, label: "status", children: <Badge color={project?.status?.color}>{project?.status?.title}</Badge> },
];

const ProjectDetails = () => {
  const { id } = useParams();

  const project = useGetProjectByIdQuery(id);

  if (project.isLoading) return <Loader />;

  if (project.isError) return <Placeholder title={project.error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  const infoList = createInfoListItems(project.data);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
        <Stack>
          <Group>
            <Avatar alt={project.data.title} size={"xl"}>
              {getAbbreviation(project.data.title)}
            </Avatar>

            <Stack gap={4}>
              <Group gap={"xs"}>
                <Tooltip label={project.data.title} tt={"capitalize"}>
                  <Text size="lg" fw={700} tt={"capitalize"}>
                    {truncate(project.data.title, { length: 15 })}
                  </Text>
                </Tooltip>

                <EditProjectModalButton project={project.data} />

                <DeleteProjectButton projectId={project.data._id} redirect />
              </Group>

              <Text size="xs" fw={500} mt={6}>
                <Text component="span" c={"dimmed"}>
                  Project ID:
                </Text>
                {` ${project.data._id}`}
              </Text>

              <Text size="xs" fw={500}>
                <Text component="span" c={"dimmed"}>
                  Created on:
                </Text>
                {` ${formatDate(project.data.createdAt)}`}
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
                notes
              </Text>
            </Group>

            <Text size="sm" fw={500}>
              {project.data.notes || "No additional notes"}
            </Text>
          </Paper>

          <Tabs variant="pills" defaultValue="orders">
            <Paper p={4} mb={"md"}>
              <Tabs.List grow>
                <Tabs.Tab value="orders" tt={"capitalize"}>
                  orders
                </Tabs.Tab>

                <Tabs.Tab value="tasks" tt={"capitalize"}>
                  tasks
                </Tabs.Tab>

                <Tabs.Tab value="comments" tt={"capitalize"}>
                  comments
                </Tabs.Tab>
              </Tabs.List>
            </Paper>

            <Tabs.Panel value="orders">
              <Stack>
                <AddOrderModalButton clientInfo={{ client: project.data.client._id, brand: project.data.brand._id, project: project.data._id }} />

                <OrdersTable query={{ client: project.data.client._id }} hideColumns={["client", "brand",]} />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="tasks">
              <Stack>
                <AddTaskModalButton clientInfo={{ client: project.data.client._id, brand: project.data.brand._id, project: project.data._id }} />

                <TasksTable query={{ project: id }} hideColumns={["project"]} />
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="comments">
              <CommentBox resource="project" resourceId={id} />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default ProjectDetails;
