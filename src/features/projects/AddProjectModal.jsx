import { Button, Fieldset, Grid, Modal, NumberInput, ScrollArea, SegmentedControl, Stack, Textarea, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "src/api/project";
import BrandsSelect from "src/features/brands/BrandsSelect";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import ClientsSelect from "../clients/ClientsSelect";
import PicklistsMultiSelect from "../picklists/components/PicklistsMultiSelect";
import UsersMultiSelect from "../users/UsersMultiSelect";
import Placeholder from "src/components/Placeholder";

const CLIENT_MODES = [
  { label: "Existing", value: "existing" },
  { label: "New", value: "new" },
];

const AddProjectModal = ({ isOpen = false, onClose = () => {} }) => {
  const createProjectMutation = useCreateProjectMutation();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      brand: undefined,
      clientMode: "existing",
      clientPayload: {
        client: undefined,
        title: "",
        email: "",
        phone: "",
      },
      title: "",
      description: "",
      amount: 0,
      startDate: new Date(),
      endDate: new Date(),
      type: undefined,
      status: undefined,
      services: [],
      assignees: [],
    },
  });

  form.watch("brand", ({ value, previousValue }) => {
    if (value !== previousValue) {
      form.setFieldValue("clientPayload.client", undefined);
    }
  });

  form.watch("clientMode", ({ value, previousValue }) => {
    if (value !== previousValue) {
      form.setFieldValue("clientPayload.client", undefined);
      form.setFieldValue("clientPayload.title", "");
      form.setFieldValue("clientPayload.email", "");
      form.setFieldValue("clientPayload.phone", "");
    }
  });

  const handleSubmit = (values) => {
    const payload = { ...values };

    if (payload.clientPayload.client) {
      delete payload.clientPayload.title;
      delete payload.clientPayload.email;
      delete payload.clientPayload.phone;
    } else {
      delete payload.clientPayload.client;
    }

    createProjectMutation.mutate(payload, {
      onSuccess: ({ data }) => navigate(`/projects/${data._id}`),
    });
  };

  const clientMode = form.getValues().clientMode;

  return (
    <Modal size={"xl"} title={"create project"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <SegmentedControl fullWidth data={CLIENT_MODES} {...form.getInputProps("clientMode")} />
        <ScrollArea.Autosize mah={450} scrollbars="y">
          <Stack gap="lg">
            <Fieldset legend="Client Information" tt={"capitalize"}>
              <Grid grow align="flex-end">
                <Grid.Col span={{ base: 12, sm: clientMode === "existing" ? 6 : 12 }}>
                  <BrandsSelect selectProps={{ required: true, label: "brand", clearable: true, Placeholder: "Select Brand", ...form.getInputProps("brand") }} />
                </Grid.Col>
                {clientMode === "existing" ? (
                  <>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <ClientsSelect
                        selectProps={{ required: true, label: "client", Placeholder: "Select Client", ...form.getInputProps("clientPayload.client") }}
                        queryObject={form.getValues().brand && { brand: form.getValues().brand }}
                      />
                    </Grid.Col>
                  </>
                ) : (
                  <>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <TextInput required label="title" {...form.getInputProps("clientPayload.title")} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <TextInput required label="email" {...form.getInputProps("clientPayload.email")} />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <TextInput type="tel" label="phone" {...form.getInputProps("clientPayload.phone")} />
                    </Grid.Col>
                  </>
                )}
              </Grid>
            </Fieldset>

            <Fieldset legend="Project Information" tt={"capitalize"}>
              <Grid grow align="flex-end">
                <Grid.Col span={{ base: 12, sm: 12 }}>
                  <TextInput required label="title" {...form.getInputProps("title")} />
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <PicklistsSelect
                    queryObject={{ resource: "Project", field: "status" }}
                    selectProps={{ label: "project status", Placeholder: "Select Project Status", ...form.getInputProps("status") }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <PicklistsSelect
                    queryObject={{ resource: "Project", field: "type" }}
                    selectProps={{ required: true, label: "project type", Placeholder: "Select Project Type", ...form.getInputProps("type") }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <DatePickerInput label="start date" {...form.getInputProps("startDate")} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <DatePickerInput label="end date" minDate={form.getValues().startDate} {...form.getInputProps("endDate")} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput required label="amount" prefix="$" placeholder="Enter Amount" {...form.getInputProps("amount")} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <UsersMultiSelect queryObject={{ brands: form.getValues().brand }} multiSelectProps={{ label: "assigned to", Placeholder: "Select Assignees", ...form.getInputProps("assignees") }} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PicklistsMultiSelect
                    queryObject={{ resource: "Order", field: "services" }}
                    multiSelectProps={{ label: "services", placeholder: "Select Services", ...form.getInputProps("services") }}
                  />
                </Grid.Col>
                <Grid.Col span={12}>
                  <Textarea rows={3} label="description" {...form.getInputProps("description")} />
                </Grid.Col>
              </Grid>
            </Fieldset>
          </Stack>
        </ScrollArea.Autosize>

        <Button type="submit" loading={createProjectMutation.isPending}>
          Create project
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddProjectModal;
