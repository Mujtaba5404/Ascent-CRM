import { Button, Grid, Modal, NumberInput, PasswordInput, ScrollArea, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { Country } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useCreateClientMutation } from "src/api/client";
import BrandsSelect from "src/features/brands/BrandsSelect";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import PicklistsTagsInput from "src/features/picklists/components/PicklistsTagsInput";
import AccountManagersSelect from "src/features/users/AccountManagersSelect";

const COUNTRIES = Country.getAllCountries(); // TODO: decide to either introduce country or not

const AddClientModal = ({ isOpen = false, onClose = () => {} }) => {
  const createClientMutation = useCreateClientMutation();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      title: "",
      email: "",
      password: "",
      phone: "",
      notes: "",
      brand: undefined,
    },
  });

  form.watch("brand", ({ value, previousValue }) => {
    if (value !== previousValue) {
      form.setFieldValue("user", undefined);
    }
  });

  // form.watch("initialOrderPayload.orderType", ({ value, previousValue }) => {
  //   if (value !== previousValue) {
  //     form.setFieldValue("initialOrderPayload.orderStage", undefined);
  //   }
  // });

  const handlePhone = (e) => form.setFieldValue("phone", e.target.value.replace(/[^0-9/]/g, ""));

  const handleSubmit = (values) => {
    createClientMutation.mutate(values, {
      onSuccess: ({ data }) => navigate(`/clients/${data._id}`),
    });
  };

  return (
    <Modal size={"lg"} title={"create client"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea.Autosize mah={450} scrollbars="y">
          <Grid grow align="flex-end">
            {/* <Grid.Col span={{ base: 12, sm: 6 }}>
              <AccountManagersSelect
              selectProps={{ required: true, label: "account manager", ...form.getInputProps("user") }}
              queryObject={form.getValues().brand && { brands: form.getValues().brand }}
              />
              </Grid.Col> */}
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <TextInput required label="client name" {...form.getInputProps("title")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <TextInput type="email" required label="client email" {...form.getInputProps("email")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 4 }}>
              <TextInput type="tel" required label="Client Phone" placeholder="Use / for multiple phones" tt={"initial"} {...form.getInputProps("phone")} onChange={handlePhone} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <PasswordInput required label="password" placeholder="your password" leftSection={<IconLock size={18} />} leftSectionPointerEvents="none" {...form.getInputProps("password")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <BrandsSelect selectProps={{ required: true, label: "brand", ...form.getInputProps("brand") }} />
            </Grid.Col>
            {/* <Grid.Col span={12}>
              <TextInput type="email" required label="sales person email" {...form.getInputProps("initialOrderPayload.salesEmail")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <NumberInput required label="order amount" prefix="$" {...form.getInputProps("initialOrderPayload.amount")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <PicklistsSelect
                queryObject={{ resource: "Order", field: "paymentGateway" }}
                selectProps={{ required: true, label: "payment gateway", ...form.getInputProps("initialOrderPayload.paymentGateway") }}
              />
            </Grid.Col> */}
            {/* <Grid.Col span={{ base: 12, sm: form.getValues().initialOrderPayload.orderType ? 6 : 12 }}>
              <PicklistsSelect queryObject={{ resource: "Order", field: "orderType" }} selectProps={{ required: true, label: "order type", ...form.getInputProps("initialOrderPayload.orderType") }} />
            </Grid.Col> */}
            {/* {form.getValues().initialOrderPayload.orderType && (
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <PicklistsSelect
                  queryObject={{ resource: "Order", field: "orderStage", parentPicklist: form.getValues().initialOrderPayload.orderType }}
                  selectProps={{ label: "order stage", ...form.getInputProps("initialOrderPayload.orderStage") }}
                />
              </Grid.Col>
            )} */}
            {/* <Grid.Col span={12}>
              <PicklistsTagsInput
                queryObject={{ resource: "Order", field: "services" }}
                tagsInputProps={{ required: true, label: "services", ...form.getInputProps("initialOrderPayload.services") }}
              />
            </Grid.Col> */}
            <Grid.Col span={12}>
              <Textarea rows={3} label="add notes (optional)" {...form.getInputProps("notes")} />
            </Grid.Col>
          </Grid>
        </ScrollArea.Autosize>

        <Button type="submit" loading={createClientMutation.isPending}>
          Create client
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddClientModal;
