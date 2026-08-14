import { ActionIcon, Button, Checkbox, Divider, Grid, Modal, ScrollArea, Select, Stack, Textarea, TextInput, Tooltip } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateTaskMutation } from "src/api/task";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import UsersMultiSelect from "src/features/users/UsersMultiSelect";
import formatDate from "src/utils/formatDate";
import ClientsSelect from "../clients/ClientsSelect";
import ProjectsSelect from "../projects/ProjectsSelect";
import Placeholder from "src/components/Placeholder";
import ENUMS from "src/constants/ENUMS";

const AddTaskModal = ({ isOpen = false, onClose = () => {}, clientInfo = {} }) => {
  const createTaskMutation = useCreateTaskMutation();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      client: clientInfo?.client || undefined,
      project: clientInfo?.project || undefined,
      title: "",
      description: "",
      subTasks: [{ title: "Sub task 1", isCompleted: false }],
      priority: undefined,
      status: undefined,
      assignees: [],
      dueDate: new Date(),
    },
    transformValues: ({ brand, ...values }) => ({ ...values }),
  });

  form.watch("brand", ({ value, previousValue }) => {
    if (value !== previousValue) {
      form.setFieldValue("client", undefined);
    }
  });

  const handleSubmit = (values) => {
    const payload = { ...values, dueDate: formatDate(values.dueDate, "YYYY-MM-DD") };

    createTaskMutation.mutate(payload, {
      onSuccess: ({ data }) => navigate(`/tasks/${data._id}`),
    });
  };

  const hasClientInfo = clientInfo?.client && clientInfo?.project;

  const subTasks = (
    <Stack gap={"xs"}>
      <Divider
        mt={"xs"}
        label={
          <Tooltip label="add sub task" tt={"capitalize"}>
            <ActionIcon onClick={() => form.insertListItem("subTasks", { title: `Sub task ${form.getValues().subTasks.length + 1}`, isCompleted: false })}>
              <IconPlus size={16} />
            </ActionIcon>
          </Tooltip>
        }
      />

      {form.getValues().subTasks.map((item, index) => (
        <Fragment key={index}>
          <TextInput
            size="xs"
            placeholder={`Sub task ${index + 1}`}
            key={form.key(`subTasks.${index}.title`)}
            leftSection={
              <Tooltip label="mark completed" tt={"capitalize"}>
                <Checkbox key={form.key(`subTasks.${index}.isCompleted`)} {...form.getInputProps(`subTasks.${index}.isCompleted`, { type: "checkbox" })} />
              </Tooltip>
            }
            rightSection={
              <ActionIcon color="red" onClick={() => form.removeListItem("subTasks", index)}>
                <IconMinus size={16} />
              </ActionIcon>
            }
            {...form.getInputProps(`subTasks.${index}.title`)}
          />
        </Fragment>
      ))}
    </Stack>
  );

  return (
    <Modal size={"lg"} title={"create task"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea.Autosize mah={450} scrollbars="y">
          <Grid grow align="flex-end" tt={"capitalize"}>
            {!hasClientInfo && (
              <>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <ClientsSelect
                    selectProps={{ required: true, label: "select client", selectLabel: "title", Placeholder: "Select Client", ...form.getInputProps("client") }}
                    brandId={form.getValues().brand}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <ProjectsSelect
                    selectProps={{ label: "select project", selectLabel: "title", Placeholder: "Select Project", ...form.getInputProps("project") }}
                    queryObject={form.getValues().client && { client: form.getValues().client }}
                  />
                </Grid.Col>
              </>
            )}
            <Grid.Col span={12}>
              <TextInput label="title" placeholder="Enter Task Title" {...form.getInputProps("title")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <PicklistsSelect queryObject={{ resource: "Task", field: "priority" }} selectProps={{ label: "priority", Placeholder: "Select Task Priority", ...form.getInputProps("priority") }} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Select label="task status" placeholder="Select Task Status" data={Object.values(ENUMS.TASK.STATUSES)} {...form.getInputProps("status")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <UsersMultiSelect queryObject={{ brands: form.getValues().brand }} multiSelectProps={{ label: "assigned to", Placeholder: "Select Assignees", ...form.getInputProps("assignees") }} />
            </Grid.Col>
            {/* <Grid.Col span={{ base: 12, sm: 6 }}>
              <DatePickerInput label="start date" {...form.getInputProps("startDate")} />
            </Grid.Col> */}
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <DatePickerInput label="due date" {...form.getInputProps("dueDate")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea label="description" rows={3} {...form.getInputProps("description")} />
            </Grid.Col>
          </Grid>

          {subTasks}
        </ScrollArea.Autosize>

        <Button type="submit" loading={createTaskMutation.isPending}>
          Create task
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddTaskModal;
