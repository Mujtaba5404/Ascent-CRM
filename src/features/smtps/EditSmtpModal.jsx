import { Button, Fieldset, Modal, PasswordInput, SimpleGrid, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { useUpdateSmtpMutation } from "src/api/smtp";
import BrandsSelect from "../brands/BrandsSelect";

const EditSmtpModal = ({ isOpen = false, onClose = () => {}, smtp }) => {
  const updateSmtpMutation = useUpdateSmtpMutation();

  const form = useForm({
    initialValues: {
      brand: smtp?.brand || "",
      name: smtp?.name || "",
      email: smtp?.email || "",
      imapHost: smtp?.imapHost || "",
      imapPort: smtp?.imapPort || "",
      imapSecure: smtp?.imapSecure ?? true,
      smtpHost: smtp?.smtpHost || "",
      smtpPort: smtp?.smtpPort || "",
      smtpSecure: smtp?.smtpSecure ?? true,
      username: smtp?.username || "",
      password: smtp?.password || "",
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
    updateSmtpMutation.mutate(
      { smtpId: smtp._id, payload },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal title={"update smtp"} tt={"capitalize"} opened={isOpen} onClose={onClose} size="lg">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <BrandsSelect selectProps={{ required: true, label: "select brand", ...form.getInputProps("brand") }} />
          <SimpleGrid cols={2}>
            <TextInput required label="name" {...form.getInputProps("name")} />
            <TextInput type="email" required label="email" {...form.getInputProps("email")} />
          </SimpleGrid>
          <SimpleGrid cols={2}>
            <TextInput required label="username" {...form.getInputProps("username")} />
            <PasswordInput required label="password" leftSection={<IconLock size={18} />} leftSectionPointerEvents="none" {...form.getInputProps("password")} />
          </SimpleGrid>
          <Fieldset legend="IMAP settings">
            <Stack gap="sm">
              <SimpleGrid cols={2}>
                <TextInput required label="imap host" {...form.getInputProps("imapHost")} />
                <TextInput required type="number" label="imap port" {...form.getInputProps("imapPort")} />
              </SimpleGrid>
              <Switch label="imap secure" {...form.getInputProps("imapSecure", { type: "checkbox" })} />
            </Stack>
          </Fieldset>
          <Fieldset legend="SMTP settings">
            <Stack gap="sm">
              <SimpleGrid cols={2}>
                <TextInput required label="smtp host" {...form.getInputProps("smtpHost")} />
                <TextInput required type="number" label="smtp port" {...form.getInputProps("smtpPort")} />
              </SimpleGrid>
              <Switch label="smtp secure" {...form.getInputProps("smtpSecure", { type: "checkbox" })} />
            </Stack>
          </Fieldset>

          <Button type="submit" mt="md" loading={updateSmtpMutation.isPending}>
            Update Smtp
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditSmtpModal;
