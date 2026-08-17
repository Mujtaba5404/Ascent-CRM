import { Button, Modal, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useConnectBasecampMutation } from "src/api/basecamp";
import CompaniesSelect from "../companies/CompaniesSelect";

const AddBaseCampModal = ({ isOpen = false, onClose = () => {} }) => {
  const connectBasecampMutation = useConnectBasecampMutation();

  const form = useForm({
    initialValues: {
      company: undefined,
      clientId: "",
      clientSecret: "",
      redirectUri: "",
    },
  });

  const handleSubmit = (values) => {
    connectBasecampMutation.mutate(values, {
      onSuccess: (response) => {
        const url = response?.data;
        if (url) {
          window.location.href = url;
        }
      },
    });
  };

  return (
    <Modal title="connect basecamp" tt="capitalize" opened={isOpen} onClose={onClose}>
      <Stack component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <CompaniesSelect
          selectProps={{
            required: true,
            label: "select company",
            placeholder: "Select company",
            ...form.getInputProps("company"),
          }}
        />
        <TextInput required label="client Id" data-autofocus {...form.getInputProps("clientId")} />
        <TextInput required label="client Secret" {...form.getInputProps("clientSecret")} />
        <TextInput required label="redirect Uri" {...form.getInputProps("redirectUri")} />
        <Button type="submit" loading={connectBasecampMutation.isPending}>
          connect basecamp
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddBaseCampModal;
