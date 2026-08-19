import { Button, Fieldset, Modal, PasswordInput, SimpleGrid, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { useCreateSmtpMutation } from "src/api/smtp";
import BrandsSelect from "../brands/BrandsSelect";

const AddSmtpModal = ({ isOpen = false, onClose = () => {} }) => {
  const createSmtpMutation = useCreateSmtpMutation();

  const form = useForm({
    initialValues: {
      brand: "",
      name: "",
      email: "",
      imapHost: "",
      imapPort: "",
      imapSecure: true,
      smtpHost: "",
      smtpPort: "",
      smtpSecure: true,
      username: "",
      password: "",
    },
  });

  const handleSubmit = (values) => {
    const payload = {
      brand: values.brand,
      name: values.name,
      email: values.email,
      imapHost: values.imapHost,
      imapPort: Number(values.imapPort),
      imapSecure: values.imapSecure,
      smtpHost: values.smtpHost,
      smtpPort: Number(values.smtpPort),
      smtpSecure: values.smtpSecure,
      username: values.username,
      password: values.password,
    };

    createSmtpMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"create smtp"} tt={"capitalize"} opened={isOpen} onClose={onClose} size="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <BrandsSelect selectProps={{ required: true, label: "select brand", ...form.getInputProps("brand") }} />
          <SimpleGrid cols={2}>
            <TextInput required label="name" data-autofocus {...form.getInputProps("name")} />
            <TextInput type="email" required label="email" {...form.getInputProps("email")} />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <TextInput required label="username" {...form.getInputProps("username")} />
            <PasswordInput required label="password" placeholder="your password" leftSection={<IconLock size={18} />} leftSectionPointerEvents="none" {...form.getInputProps("password")} />
          </SimpleGrid>
          <Fieldset legend="IMAP Information">
            <Stack gap="sm">
              <SimpleGrid cols={2}>
                <TextInput required label="imap host" {...form.getInputProps("imapHost")} />
                <TextInput required type="number" label="imap port" {...form.getInputProps("imapPort")} />
              </SimpleGrid>
              <Switch label="imap secure" {...form.getInputProps("imapSecure", { type: "checkbox" })} />
            </Stack>
          </Fieldset>
          <Fieldset legend="SMTP Information">
            <Stack gap="sm">
              <SimpleGrid cols={2}>
                <TextInput required label="smtp host" {...form.getInputProps("smtpHost")} />
                <TextInput required type="number" label="smtp port" {...form.getInputProps("smtpPort")} />
              </SimpleGrid>
              <Switch label="smtp secure" {...form.getInputProps("smtpSecure", { type: "checkbox" })} />
            </Stack>
          </Fieldset>

          <Button type="submit" mt="md" loading={createSmtpMutation.isPending}>
            Create Smtp
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default AddSmtpModal;