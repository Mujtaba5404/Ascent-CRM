import { Button, Grid, Modal, NumberInput, Stack, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useUpdateOrderMutation } from "src/api/order";
import ClientsByBrandSelect from "src/features/clients/ClientsByBrandSelect";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import PicklistsTagsInput from "src/features/picklists/components/PicklistsTagsInput";
import formatDate from "src/utils/formatDate";
import ClientsSelect from "../clients/ClientsSelect";
import PicklistsMultiSelect from "../picklists/components/PicklistsMultiSelect";

const EditOrderModal = ({ isOpen = false, onClose = () => {}, compact = false, order }) => {
  const updateOrderMutation = useUpdateOrderMutation();

  const form = useForm({
    initialValues: {
      client: order?.client._id,
      amount: order?.amount ?? 0,
      status: order?.status?._id ?? order?.status,
      services: order?.services?.map((s) => s._id || s) || [],
      paymentDate: order?.paymentDate ? new Date(order.paymentDate) : new Date(),
    },
  });

  const handleSubmit = (values) => {
    const payload = { ...values, paymentDate: formatDate(values.paymentDate, "YYYY-MM-DD") };
    updateOrderMutation.mutate({ orderId: order._id, payload }, { onSuccess: onClose });
  };

  const basicFields = (
    <>
      <Grid.Col span={12}>
        <ClientsSelect selectProps={{ required: true, label: "client", selectLabel: "title", ...form.getInputProps("client") }} brandId={order?.brand?._id} />
      </Grid.Col>
    </>
  );

  const extraFields = (
    <>
      <Grid.Col span={{ base: 12, sm: 6 }}>
        <NumberInput required label="amount" prefix="$" {...form.getInputProps("amount")} />
      </Grid.Col>
      <Grid.Col span={12}>
        <DateInput label="Payment date" maxDate={new Date()} {...form.getInputProps("createdAt")} />
      </Grid.Col>
    </>
  );

  return (
    <Modal size={compact ? "md" : "lg"} title={"update order"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <Grid grow align="flex-end">
          {!compact && basicFields}

          <Grid.Col span={{ base: 12, sm: 8 }}>
            <PicklistsMultiSelect queryObject={{ resource: "Order", field: "services" }} multiSelectProps={{ label: "services", ...form.getInputProps("services") }} />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: form.getValues().orderStatus ? 6 : 6 }}>
            <PicklistsSelect queryObject={{ resource: "Order", field: "status" }} selectProps={{ label: "order status", ...form.getInputProps("status") }} />
          </Grid.Col>

          {!compact && extraFields}
        </Grid>

        <Button type="submit" loading={updateOrderMutation.isPending}>
          Update order
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditOrderModal;
