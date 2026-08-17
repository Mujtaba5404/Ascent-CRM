import { Button, Grid, Modal, ScrollArea, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Country } from "country-state-city";
import { useNavigate } from "react-router-dom";
import { useCreateClientMutation } from "src/api/client";
import BrandsSelect from "src/features/brands/BrandsSelect";

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
      description: "",
      brand: undefined,
    },
  });

  form.watch("brand", ({ value, previousValue }) => {
    if (value !== previousValue) {
      form.setFieldValue("user", undefined);
    }
  });

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
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput required label="client name" placeholder="Enter Client Name" {...form.getInputProps("title")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput type="email" required label="client email" placeholder="Enter Client Email" {...form.getInputProps("email")} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <TextInput type="tel" label="Client Phone" placeholder="Use / for multiple phones" tt={"initial"} {...form.getInputProps("phone")} onChange={handlePhone} />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 8 }}>
              <BrandsSelect selectProps={{ required: true, label: "brand", Placeholder:"Select Brand", ...form.getInputProps("brand") }} />
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
