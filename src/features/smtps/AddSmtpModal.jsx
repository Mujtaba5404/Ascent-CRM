import { Button, Modal, PasswordInput, SimpleGrid, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { useCreateSmtpMutation } from "src/api/smtp";
import BrandsSelect from "../brands/BrandsSelect";

const AddSmtpModal = ({ isOpen = false, onClose = () => {} }) => {
  const createSmtpMutation = useCreateSmtpMutation();

  const form = useForm({
    initialValues: {
      brand: "",
      imap: "",
      host: "",
      port: "",
      user: "",
      password: "",
      email: "",
      isActive: true,
    },
  });

  const handleSubmit = (values) => {
    const payload = {
      brand: values.brand,
      imap: values.imap,
      host: values.host,
      port: Number(values.port),
      user: values.user,
      pass: values.password,
      email: values.email,
      isActive: values.isActive,
    };

    createSmtpMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"create smtp"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <BrandsSelect
            selectProps={{
              required: true,
              label: "select brand",
              ...form.getInputProps("brand"),
            }}
          />
          <SimpleGrid cols={2}>
            <TextInput required label="imap" data-autofocus {...form.getInputProps("imap")} />
            <TextInput required label="host" data-autofocus {...form.getInputProps("host")} />
            <TextInput required label="port" data-autofocus {...form.getInputProps("port")} />
            <TextInput required label="user" data-autofocus {...form.getInputProps("user")} />
          </SimpleGrid>

          <PasswordInput required label="password" placeholder="your password" leftSection={<IconLock size={18} />} leftSectionPointerEvents="none" {...form.getInputProps("password")} />
          <TextInput type="email" required autoFocus label="email" leftSectionPointerEvents="none" {...form.getInputProps("email")} />

          <Switch label="active" {...form.getInputProps("isActive", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={createSmtpMutation.isPending}>
            Create Smtp
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddSmtpModal;
