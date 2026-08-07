import { ActionIcon, Button, Checkbox, Divider, Grid, Modal, ScrollArea, Stack, Textarea, TextInput, Tooltip } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { Fragment } from "react";
import { useUpdateTaskMutation } from "src/api/task";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import UsersMultiSelect from "src/features/users/UsersMultiSelect";
import formatDate from "src/utils/formatDate";

const EditTaskModal = ({ isOpen = false, onClose = () => {}, compact = false, task }) => {
  const updateTaskMutation = useUpdateTaskMutation();

  const form = useForm({
    initialValues: {
      title: task?.title,
      description: task?.description,
      subTasks: task?.subTasks?.length > 0 ? task.subTasks : [{ title: "Sub task 1", isCompleted: false }],
      priority: task?.priority?._id,
      status: task?.status?._id,
      assignedTo: task?.assignedTo?.map((a) => a._id),
      dueDate: task?.dueDate ? new Date(task?.dueDate?.split("T")[0]) : null,
    },
    transformValues: (values) => ({
      ...values,
      subTasks: values.subTasks.map((subTask) => ({ title: subTask.title, isCompleted: subTask.isCompleted })),
    }),
  });

  const handleSubmit = (values) => {
    const payload = { ...values, dueDate: formatDate(values.dueDate, "YYYY-MM-DD") };

    updateTaskMutation.mutate({ taskId: task._id, payload }, { onSuccess: onClose });
  };

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
        <Fragment key={item._id}>
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

  const BasicFields = () => (
    <>
      <Grid.Col span={12}>
        <TextInput label="title" {...form.getInputProps("title")} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Textarea label="description" rows={3} {...form.getInputProps("description")} />
      </Grid.Col>
    </>
  );

  return (
    <Modal size={compact ? "md" : "lg"} title={"update task"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea.Autosize mah={450} scrollbars="y">
          <Grid grow align="flex-end" tt={"capitalize"}>
            {!compact && <BasicFields />}

            <Grid.Col span={{ base: 12, sm: compact ? 12 : 6 }}>
              <PicklistsSelect queryObject={{ resource: "Task", field: "priority" }} selectProps={{ label: "priority", ...form.getInputProps("priority") }} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: compact ? 12 : 6 }}>
              <PicklistsSelect queryObject={{ resource: "Task", field: "status" }} selectProps={{ label: "status", ...form.getInputProps("status") }} />
            </Grid.Col>
            <Grid.Col span={12}>
              <UsersMultiSelect queryObject={{ brands: task.brand._id }} multiSelectProps={{ label: "assigned to", ...form.getInputProps("assignedTo") }} />
            </Grid.Col>
            <Grid.Col span={12}>
              <DatePickerInput label="due date" {...form.getInputProps("dueDate")} />
            </Grid.Col>
          </Grid>

          {subTasks}
        </ScrollArea.Autosize>

        <Button type="submit" loading={updateTaskMutation.isPending}>
          Update task
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditTaskModal;
