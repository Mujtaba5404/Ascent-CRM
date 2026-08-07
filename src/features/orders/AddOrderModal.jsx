import { Button, Grid, Modal, NumberInput, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "src/api/order";
import PicklistsSelect from "src/features/picklists/components/PicklistsSelect";
import PicklistsTagsInput from "src/features/picklists/components/PicklistsTagsInput";
import ClientsSelect from "../clients/ClientsSelect";

const AddOrderModal = ({ isOpen = false, onClose = () => {}, clientInfo = {} }) => {
  const createOrderMutation = useCreateOrderMutation();

  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      client: clientInfo?.client || undefined,
      amount: 0,
      status: undefined,
      services: [],
      paymentDate: new Date(),
    },
  });

  form.watch("status", ({ previousValue, value }) => {
    if (value !== previousValue) {
      form.setFieldValue("orderStage", undefined);
    }
  });

  const handleSubmit = (values) => {
    createOrderMutation.mutate(values, {
      onSuccess: ({ data }) => navigate(`/orders/${data._id}`),
    });
  };

  const hasClientInfo = clientInfo?.client && clientInfo?.client;

  return (
    <Modal size={"lg"} title={"create order"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <Grid grow align="flex-end" tt={"capitalize"}>
          {!hasClientInfo && (
            <>
              <Grid.Col span={{ base: 12, sm: form.getValues().brand ? 6 : 12 }}>
                <ClientsSelect selectProps={{ required: true, label: "client", placeholder: "Select a client", ...form.getInputProps("client") }} />
              </Grid.Col>
            </>
          )}
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <PicklistsTagsInput queryObject={{ resource: "Order", field: "services" }} tagsInputProps={{ required: true, label: "Services", ...form.getInputProps("services") }} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <PicklistsSelect queryObject={{ resource: "Order", field: "status" }} selectProps={{ label: "Order Status", ...form.getInputProps("status") }} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <NumberInput required label="amount" prefix="$" {...form.getInputProps("amount")} />
          </Grid.Col>
          <Grid.Col span={12}>
            <DateInput label="paymentDate" maxDate={new Date()} {...form.getInputProps("paymentDate")} />
          </Grid.Col>
        </Grid>

        <Button type="submit" loading={createOrderMutation.isPending}>
          Create order
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddOrderModal;
