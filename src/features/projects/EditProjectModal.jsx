import { Button, Grid, Modal, NumberInput, Stack, Textarea, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useGetPicklistByIdQuery } from "src/api/picklist";
import { useUpdateProjectMutation } from "src/api/project";
import BrandsSelect from "src/features/brands/BrandsSelect";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import formatDate from "src/utils/formatDate";
import ClientsSelect from "../clients/ClientsSelect";
import PicklistsTagsInput from "../picklists/components/PicklistsTagsInput";
import UsersMultiSelect from "../users/UsersMultiSelect";
import PicklistsMultiSelect from "../picklists/components/PicklistsMultiSelect";
import Placeholder from "src/components/Placeholder";

const EditProjectModal = ({ isOpen = false, onClose = () => {}, compact = false, project }) => {
  const updateProjectMutation = useUpdateProjectMutation();

  const form = useForm({
    initialValues: {
      title: project?.title,
      description: project?.description,
      brand: project?.brand?._id,
      // client: project?.client?._id,
      status: project?.status?._id,
      type: project?.type?._id,
      amount: project?.amount,
      services: project?.services?.map((service) => service._id) || [],
      assignees: project?.assignees?.map((a) => a._id) || [],
      startDate: new Date(project?.startDate.split("T")[0]),
      endDate: new Date(project?.endDate.split("T")[0]),
      // paymentDate: new Date(project?.endDate.split("T")[0]),
    },
  });

  const type = useGetPicklistByIdQuery(form.getValues().type);
  const status = useGetPicklistByIdQuery(form.getValues().status);

  const handleSubmit = (values) => {
    const payload = { ...values, startDate: formatDate(values.startDate, "YYYY-MM-DD"), endDate: formatDate(values.endDate, "YYYY-MM-DD") };
    payload.meta = { type: type.data?.title, status: status.data?.title };

    updateProjectMutation.mutate({ projectId: project._id, payload }, { onSuccess: onClose });
  };

  const basicFields = (
    <>
      <Grid.Col span={{ base: 12, sm: 12 }}>
        <TextInput required label="title" {...form.getInputProps("title")} />
      </Grid.Col>
    </>
  );

  const extraFields = (
    <>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <DatePickerInput label="start date" {...form.getInputProps("startDate")} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 4 }}>
        <DatePickerInput label="end date" {...form.getInputProps("endDate")} />
      </Grid.Col>
      {/* <Grid.Col span={{ base: 12, sm: 6 }}>
        <DateInput label="paymentDate" maxDate={new Date()} {...form.getInputProps("paymentDate")} />
      </Grid.Col> */}
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <NumberInput required label="amount" prefix="$" placeholder="Enter Amount" {...form.getInputProps("amount")} />
      </Grid.Col>
      <Grid.Col span={12}>
        <Textarea rows={3} label="description" {...form.getInputProps("description")} />
      </Grid.Col>
    </>
  );

  return (
    <Modal size={compact ? "lg" : "xl"} title={"update project"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <Grid grow align="flex-end">
          {!compact && basicFields}

          <Grid.Col span={{ base: 12, sm: compact ? 12 : 8 }}>
            <BrandsSelect selectProps={{ required: true, label: "brand", Placeholder: "Select Brand",...form.getInputProps("brand") }} />
          </Grid.Col>

          {/* <Grid.Col span={{ base: 12, sm: compact ? 12 : 6 }}>
            <ClientsSelect selectProps={{ required: true, label: "client", ...form.getInputProps("client") }} queryObject={form.getValues().brand && { brands: form.getValues().brand }} />
          </Grid.Col> */}

          <Grid.Col span={{ base: 12, sm: compact ? 6 : 6 }}>
            <PicklistsSelect queryObject={{ resource: "Project", field: "status" }} selectProps={{ label: "project status", Placeholder: "Select Project Status", ...form.getInputProps("status") }} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: compact ? 6 : 6 }}>
            <PicklistsSelect queryObject={{ resource: "Project", field: "type" }} selectProps={{ label: "project type", Placeholder: "Select Project Type", ...form.getInputProps("type") }} />
          </Grid.Col>

          <Grid.Col span={12}>
            <PicklistsMultiSelect queryObject={{ resource: "Project", field: "services" }} multiSelectProps={{label: "Project services", Placeholder:"Select Project Services", ...form.getInputProps("services")}}/>
          </Grid.Col>

          <Grid.Col span={12}>
            <UsersMultiSelect queryObject={form.getValues().brand && { brands: form.getValues().brand }} multiSelectProps={{ label: "assigned to", ...form.getInputProps("assignees") }} />
          </Grid.Col>

          {!compact && extraFields}
        </Grid>

        <Button type="submit" loading={updateProjectMutation.isPending}>
          Update project
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditProjectModal;
