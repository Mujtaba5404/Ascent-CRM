// import { Button, Fieldset, Grid, Modal, NumberInput, ScrollArea, Stack, Textarea, TextInput } from "@mantine/core";
// import { DateInput, DatePickerInput } from "@mantine/dates";
// import { useForm } from "@mantine/form";
// import { useNavigate } from "react-router-dom";
// import { useCreateProjectMutation } from "src/api/project";
// import BrandsSelect from "src/features/brands/BrandsSelect";
// import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
// import ClientsSelect from "../clients/ClientsSelect";
// import PicklistsMultiSelect from "../picklists/components/PicklistsMultiSelect";
// import UsersMultiSelect from "../users/UsersMultiSelect";

// const AddProjectModal = ({ isOpen = false, onClose = () => {} }) => {
//   const createProjectMutation = useCreateProjectMutation();

//   const navigate = useNavigate();

//   const form = useForm({
//     initialValues: {
//       title: "",
//       brand: undefined,
//       client: undefined,
//       description: "",
//       initialProjectPayload: {
//         startDate: new Date(),
//         endDate: new Date(),
//         paymentDate: new Date(),
//         amount: 0,
//         type: undefined,
//         status: undefined,
//         services: [],
//         assignees: [],
//       },
//     },
//   });

//   form.watch("brand", ({ value, previousValue }) => {
//     if (value !== previousValue) {
//       form.setFieldValue("client", undefined);
//     }
//   });

//   const handleSubmit = (values) => {
//     const payload = {
//       brand: values.brand,
//       client: values.client,
//       ...values.initialProjectPayload,
//     };

//     console.log(payload);
//     createProjectMutation.mutate(payload, {
//       onSuccess: ({ data }) => navigate(`/projects/${data._id}`),
//     });
//   };

//   return (
//     <Modal size={"xl"} title={"create project"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
//       <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
//         <ScrollArea.Autosize mah={450} scrollbars="y">
//           <Stack gap="md">
//             <Fieldset legend="Project Information" tt={"capitalize"}>
//               <Grid grow align="flex-end">
//                 <Grid.Col span={{ base: 12, sm: 12 }}>
//                   <TextInput required label="title" {...form.getInputProps("title")} />
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, sm: 6 }}>
//                   <BrandsSelect selectProps={{ required: true, label: "brand", ...form.getInputProps("brand") }} />
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, sm: 6 }}>
//                   <ClientsSelect selectProps={{ required: true, label: "client", ...form.getInputProps("client") }} queryObject={form.getValues().brand && { brands: form.getValues().brand }} />
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, sm: 6 }}>
//                   <PicklistsSelect
//                     queryObject={{ resource: "Project", field: "status" }}
//                     selectProps={{ required: true, label: "project status", ...form.getInputProps("initialProjectPayload.status") }}
//                   />
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, sm: 6 }}>
//                   <PicklistsSelect queryObject={{ resource: "Project", field: "type" }} selectProps={{ required: true, label: "project type", ...form.getInputProps("initialProjectPayload.type") }} />
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, sm: 4 }}>
//                   <DatePickerInput label="start date" {...form.getInputProps("initialProjectPayload.startDate")} />
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, sm: 4 }}>
//                   <DatePickerInput label="end date" {...form.getInputProps("initialProjectPayload.endDate")} />
//                 </Grid.Col>
//                 <Grid.Col span={12}>
//                   <UsersMultiSelect queryObject={{ brands: form.getValues().brand }} multiSelectProps={{ label: "assigned to", ...form.getInputProps("initialProjectPayload.assignees") }} />
//                 </Grid.Col>
//                 <Grid.Col span={12}>
//                   <Textarea rows={3} label="description" {...form.getInputProps("description")} />
//                 </Grid.Col>
//               </Grid>
//             </Fieldset>

//             <Fieldset legend="Order Information" tt={"capitalize"}>
//               <Grid grow align="flex-end">
//                 <Grid.Col span={{ base: 12, sm: 6 }}>
//                   <DateInput label="payment Date" maxDate={new Date()} {...form.getInputProps("initialProjectPayload.paymentDate")} />
//                 </Grid.Col>
//                 <Grid.Col span={{ base: 12, sm: 6 }}>
//                   <NumberInput required label="amount" prefix="$" {...form.getInputProps("initialProjectPayload.amount")} />
//                 </Grid.Col>
//                 <Grid.Col span={12}>
//                   <PicklistsMultiSelect queryObject={{ resource: "Order", field: "services" }} multiSelectProps={{ label: "services", ...form.getInputProps("services") }} />
//                 </Grid.Col>
//               </Grid>
//             </Fieldset>
//           </Stack>
//         </ScrollArea.Autosize>

//         <Button type="submit" loading={createProjectMutation.isPending}>
//           Create project
//         </Button>
//       </Stack>
//     </Modal>
//   );
// };

// export default AddProjectModal;

import { Anchor, Button, Fieldset, Grid, Modal, NumberInput, PasswordInput, ScrollArea, Stack, Textarea, TextInput } from "@mantine/core";
import { DateInput, DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProjectMutation } from "src/api/project";
import BrandsSelect from "src/features/brands/BrandsSelect";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import ClientsSelect from "../clients/ClientsSelect";
import PicklistsMultiSelect from "../picklists/components/PicklistsMultiSelect";
import UsersMultiSelect from "../users/UsersMultiSelect";

const AddProjectModal = ({ isOpen = false, onClose = () => {} }) => {
  const createProjectMutation = useCreateProjectMutation();

  const [showAddClient, setShowAddClient] = useState(false);

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      brand: undefined,
      client: undefined,
      description: "",
      newClient: {
        name: "",
        email: "",
        phone: "",
        password: "",
      },
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

  const handleSubmit = ({ initialProjectPayload, newClient, client, ...rest }) => {
    const payload = { ...rest, ...initialProjectPayload, ...(showAddClient ? newClient : { client }) };
    createProjectMutation.mutate(payload, { onSuccess: ({ data }) => navigate(`/projects/${data._id}`) });
  };

  return (
    <Modal size={"xl"} title={"create project"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea.Autosize mah={450} scrollbars="y">
          <Stack gap="md">
            <Fieldset legend="Order Information" tt={"capitalize"}>
              <Grid grow align="flex-end">
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <DateInput label="payment Date" maxDate={new Date()} {...form.getInputProps("initialProjectPayload.paymentDate")} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <NumberInput required label="amount" prefix="$" {...form.getInputProps("initialProjectPayload.amount")} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <PicklistsMultiSelect queryObject={{ resource: "Order", field: "services" }} multiSelectProps={{ label: "services", ...form.getInputProps("initialProjectPayload.services") }} />
                </Grid.Col>
              </Grid>
            </Fieldset>

            <Fieldset legend="Project Information" tt={"capitalize"}>
              <Grid grow align="flex-end">
                <Grid.Col span={{ base: 12, sm: 12 }}>
                  <TextInput required label="title" {...form.getInputProps("title")} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <BrandsSelect selectProps={{ required: true, label: "brand", ...form.getInputProps("brand") }} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <ClientsSelect
                    selectProps={{
                      required: !showAddClient,
                      label: "client",
                      disabled: showAddClient,
                      ...form.getInputProps("client"),
                      onChange: (value) => {
                        form.setFieldValue("client", value);
                      },
                    }}
                    queryObject={form.getValues().brand && { brands: form.getValues().brand }}
                  />
                </Grid.Col>

                <Grid.Col span={12} ta="right" mt={-10}>
                  <Anchor size="xs" onClick={() => setShowAddClient((v) => !v)}>
                    {showAddClient ? "cancel add client" : "+ add client"}
                  </Anchor>
                </Grid.Col>

                {showAddClient && (
                  <Grid.Col span={12}>
                    <Fieldset legend="New Client" tt={"capitalize"}>
                      <Grid grow align="flex-end">
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput required label="title" {...form.getInputProps("newClient.name")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput required label="email" {...form.getInputProps("newClient.email")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput required label="phone" {...form.getInputProps("newClient.phone")} />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <PasswordInput required label="password" {...form.getInputProps("newClient.password")} />
                        </Grid.Col>
                      </Grid>
                    </Fieldset>
                  </Grid.Col>
                )}

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <PicklistsSelect
                    queryObject={{ resource: "Project", field: "status" }}
                    selectProps={{ required: true, label: "project status", ...form.getInputProps("initialProjectPayload.status") }}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <PicklistsSelect queryObject={{ resource: "Project", field: "type" }} selectProps={{ required: true, label: "project type", ...form.getInputProps("initialProjectPayload.type") }} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <DatePickerInput label="start date" {...form.getInputProps("initialProjectPayload.startDate")} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 4 }}>
                  <DatePickerInput label="end date" {...form.getInputProps("initialProjectPayload.endDate")} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <UsersMultiSelect queryObject={{ brands: form.getValues().brand }} multiSelectProps={{ label: "assigned to", ...form.getInputProps("initialProjectPayload.assignees") }} />
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
