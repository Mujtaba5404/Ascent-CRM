import { Button, Grid, Modal, Stack, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useUpdateClientMutation } from "src/api/client";
import { useGetPicklistByIdQuery } from "src/api/picklist";
import BrandsSelect from "src/features/brands/BrandsSelect";
import formatDate from "src/utils/formatDate";

const EditClientModal = ({ isOpen = false, onClose = () => {}, compact = false, client }) => {
  const updateClientMutation = useUpdateClientMutation();

  const form = useForm({
    initialValues: {
      title: client.title,
      email: client.email,
      password: client.password,
      phone: client.phone,
      description: client.description,
      brand: client.brand._id,
      createdAt: new Date(client.createdAt.split("T")[0]),
    },
  });

  form.watch("brand", ({ previousValue, value }) => {
    if (value !== previousValue) {
      form.setFieldValue("user", undefined);
    }
  });

  const health = useGetPicklistByIdQuery(form.getValues().health);
  const status = useGetPicklistByIdQuery(form.getValues().status);

  const handlePhone = (e) => form.setFieldValue("phone", e.target.value.replace(/[^0-9/]/g, ""));

  const handleSubmit = (values) => {
    const payload = { ...values, createdAt: formatDate(values.createdAt, "YYYY-MM-DD") };
    payload.meta = { health: health.data?.title, status: status.data?.title };

    updateClientMutation.mutate({ clientId: client._id, payload }, { onSuccess: onClose });
  };

  const basicFields = (
    <>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <TextInput required label="client name" {...form.getInputProps("title")} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <TextInput type="email" required label="client email" {...form.getInputProps("email")} />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <TextInput type="tel" label="Client Phone" placeholder="Use / for multiple phones" tt={"initial"} {...form.getInputProps("phone")} onChange={handlePhone} />
      </Grid.Col>
    </>
  );

  const extraFields = (
    <>
      {/* <Grid.Col span={12}>
        <DateInput label="date" maxDate={new Date()} {...form.getInputProps("createdAt")} />
      </Grid.Col> */}
    </>
  );

  return (
    <Modal size={compact ? "md" : "xl"} title={"update client"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <Grid grow align="flex-end">
          {!compact && basicFields}

          <Grid.Col span={{ base: 12, sm: compact ? 12 : 8 }}>
            <BrandsSelect selectProps={{ required: true, label: "brand", ...form.getInputProps("brand") }} />
          </Grid.Col>

          {!compact && extraFields}
        </Grid>

        <Button type="submit" loading={updateClientMutation.isPending}>
          Update client
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditClientModal;
