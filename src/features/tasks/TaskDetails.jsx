import { Avatar, Badge, Divider, Grid, Group, Loader, Paper, Stack, Text, Tooltip } from "@mantine/core";
import { IconCalendarTime, IconNote, IconProgressCheck, IconSubtask, IconUrgent, IconUser, IconX } from "@tabler/icons-react";
import { truncate } from "lodash";
import { useParams } from "react-router-dom";
import { useGetTaskByIdQuery } from "src/api/task";
import AvatarGroup from "src/components/AvatarGroup";
import Placeholder from "src/components/Placeholder";
import { SERVER_URL } from "src/constants/SERVER_URL";
import CommentBox from "src/features/comments/CommentBox";
import classes from "src/index.module.css";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskModalButton from "./EditTaskModalButton";
import SubTasksPopover from "./SubTasksPopover";

const TaskDetails = () => {
  const { id } = useParams();

  const task = useGetTaskByIdQuery(id);

  if (task.isLoading) return <Loader />;

  if (task.isError) return <Placeholder title={task.error?.response?.data.message || "Error"} icon={<IconX size={50} />} />;

  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 4, xl: 3 }}>
        <Stack>
          <Group>
            <Avatar alt={task.data.title} size={"xl"}>
              {getAbbreviation(task.data.title)}
            </Avatar>

            <Stack gap={4}>
              <Group gap={"xs"}>
                <Tooltip label={task.data.title} tt={"capitalize"}>
                  <Text size="lg" fw={700} tt={"capitalize"}>
                    {truncate(task.data.title, { length: 15 })}
                  </Text>
                </Tooltip>

                <EditTaskModalButton task={task.data} />

                <DeleteTaskButton taskId={task.data._id} redirect />
              </Group>

              <Text size="xs" fw={500} mt={6}>
                <Text component="span" c={"dimmed"}>
                  Task ID:
                </Text>
                {` ${task.data._id}`}
              </Text>

              <Text size="xs" fw={500}>
                <Text component="span" c={"dimmed"}>
                  Created on:
                </Text>
                {` ${formatDate(task.data.createdAt)}`}
              </Text>
            </Stack>
          </Group>

          <Paper withBorder p={"md"} tt={"capitalize"}>
            <Stack>
              <Group>
                <IconUser className={classes.icon} />

                <Stack gap={2}>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Client
                  </Text>
                  <Text size="sm" fw={500}>
                    {task.data.client.title}
                  </Text>
                </Stack>
              </Group>

              <Divider />

              <Group>
                <Avatar src={`${SERVER_URL}${task.data.brand.imgUrl}`} size={24} />

                <Stack gap={2}>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Brand
                  </Text>
                  <Text size="sm" fw={500}>
                    {task.data.brand.title}
                  </Text>
                </Stack>
              </Group>

              <Divider />

              <Group>
                <IconSubtask className={classes.icon} />

                <Stack gap={6}>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Sub tasks
                  </Text>

                  <SubTasksPopover subtasks={task.data.subTasks} />
                </Stack>
              </Group>

              <Divider />

              <Group>
                <IconProgressCheck className={classes.icon} />

                <Stack gap={6}>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    status
                  </Text>

                  <Badge color={task.data.status?.color}>{task.data.status?.title}</Badge>
                </Stack>
              </Group>

              <Divider />

              <Group>
                <IconUrgent className={classes.icon} />

                <Stack gap={6}>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    priority
                  </Text>

                  <Badge color={task.data.priority?.color}>{task.data.priority?.title}</Badge>
                </Stack>
              </Group>

              <Divider />

              <Group>
                <IconCalendarTime className={classes.icon} />

                <Stack gap={2}>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Due date
                  </Text>
                  <Text size="sm" fw={500}>
                    {formatDate(task.data?.dueDate)}
                  </Text>
                </Stack>
              </Group>

              <Divider />

              <Group>
                <IconUser className={classes.icon} />

                <Stack gap={6}>
                  <Text size="xs" c={"dimmed"} fw={500}>
                    Assigned to
                  </Text>

                  <AvatarGroup items={task.data?.assignedTo} getLabel={(i) => i.name} />
                </Stack>
              </Group>
            </Stack>
          </Paper>
        </Stack>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 8, xl: 9 }}>
        <Stack>
          <Paper withBorder p={"md"}>
            <Group gap={8} align="flex-end" mb={"xs"}>
              <IconNote className={classes.icon} />

              <Text size="xs" c={"dimmed"} fw={500}>
                Description
              </Text>
            </Group>

            <Text size="sm" fw={500} style={{ wordBreak: "break-all" }}>
              {task.data.description || "no description"}
            </Text>
          </Paper>

          <CommentBox resource="Task" resourceId={id} />
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default TaskDetails;
