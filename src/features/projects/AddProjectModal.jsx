import { Button, Grid, Modal, NumberInput, ScrollArea, Stack, Textarea, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Country } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "src/api/project";
import BrandsSelect from "src/features/brands/BrandsSelect";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import PicklistsTagsInput from "src/features/picklists/components/PicklistsTagsInput";
import ClientsSelect from "../clients/ClientsSelect";
import UsersMultiSelect from "../users/UsersMultiSelect";
import PicklistsMultiSelect from "../picklists/components/PicklistsMultiSelect";

const COUNTRIES = Country.getAllCountries(); // TODO: decide to either introduce country or not

const AddProjectModal = ({ isOpen = false, onClose = () => {} }) => {
  const createProjectMutation = useCreateProjectMutation();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      brand: undefined,
      client: undefined,
      description: "",
      initialProjectPayload: {
        startDate: new Date(),
        endDate: new Date(),
        paymentDate: new Date(),
        amount: 0,
        type: undefined,
        status: undefined,
        services: [],
        assignees: [],
      },
    },
  });

  form.watch("brand", ({ value, previousValue }) => {
    if (value !== previousValue) {
      form.setFieldValue("client", undefined);
    }
  });

  const handleSubmit = (values) => {
    const payload = {
      brand: values.brand,
      client: values.client,
      ...values.initialProjectPayload,
    };

    console.log(payload);
    createProjectMutation.mutate(payload, {
      onSuccess: ({ data }) => navigate(`/projects/${data._id}`),
    });
  };

  return (
    <Modal size={"xl"} title={"create project"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea.Autosize mah={450} scrollbars="y">
          <Grid grow align="flex-end">
            <Grid.Col span={{ base: 12, sm: 12 }}>
              <TextInput required label="title" {...form.getInputProps("title")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <BrandsSelect selectProps={{ required: true, label: "brand", ...form.getInputProps("brand") }} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <ClientsSelect selectProps={{ required: true, label: "client", ...form.getInputProps("client") }} queryObject={form.getValues().brand && { brands: form.getValues().brand }} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <PicklistsSelect
                queryObject={{ resource: "Project", field: "status" }}
                selectProps={{ required: true, label: "project status", ...form.getInputProps("initialProjectPayload.status") }}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: form.getValues().initialProjectPayload.type ? 6 : 6 }}>
              <PicklistsSelect queryObject={{ resource: "Project", field: "type" }} selectProps={{ required: true, label: "project type", ...form.getInputProps("initialProjectPayload.type") }} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <DatePickerInput label="start date" {...form.getInputProps("initialProjectPayload.startDate")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <DatePickerInput label="end date" {...form.getInputProps("initialProjectPayload.endDate")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <DateInput label="paymentDate" maxDate={new Date()} {...form.getInputProps("initialProjectPayload.paymentDate")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput required label="amount" prefix="$" {...form.getInputProps("initialProjectPayload.amount")} />
            </Grid.Col>
            <Grid.Col span={12}>
              <PicklistsMultiSelect queryObject={{ resource: "Order", field: "services" }} multiSelectProps={{ label: "services", ...form.getInputProps("services") }} />
            </Grid.Col>
            <Grid.Col span={12}>
              <UsersMultiSelect queryObject={{ brands: form.getValues().brand }} multiSelectProps={{ label: "assigned to", ...form.getInputProps("initialProjectPayload.assignees") }} />
            </Grid.Col>

            <Grid.Col span={12}>
              <Textarea rows={3} label="description" {...form.getInputProps("description")} />
            </Grid.Col>
          </Grid>
        </ScrollArea.Autosize>

        <Button type="submit" loading={createProjectMutation.isPending}>
          Create project
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddProjectModal;
