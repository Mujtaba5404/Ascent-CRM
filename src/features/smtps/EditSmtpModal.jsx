import { Button, Modal, PasswordInput, SimpleGrid, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconLock } from "@tabler/icons-react";
import { useUpdateSmtpMutation } from "src/api/smtp";
import BrandsSelect from "../brands/BrandsSelect";

const EditSmtpModal = ({ isOpen = false, onClose = () => {}, smtp }) => {
  const updateSmtpMutation = useUpdateSmtpMutation();

  const form = useForm({
    initialValues: {
      brand: smtp?.brand || "",
      imap: smtp?.imap || "",
      host: smtp?.host || "",
      port: smtp?.port || "",
      user: smtp?.user || "",
      password: smtp?.pass || "",
      email: smtp?.email || "",
      isActive: smtp?.isActive ?? true,
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

    updateSmtpMutation.mutate(
      {
        smtpId: smtp._id,
        payload,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Modal title={"update smtp"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
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
            <TextInput required label="imap" {...form.getInputProps("imap")} />
            <TextInput required label="host" {...form.getInputProps("host")} />

            <TextInput required label="port" {...form.getInputProps("port")} />
            <TextInput required label="user" {...form.getInputProps("user")} />
          </SimpleGrid>

          <PasswordInput required label="password" leftSection={<IconLock size={18} />} {...form.getInputProps("password")} />

          <TextInput type="email" required label="email" {...form.getInputProps("email")} />

          <Switch label="active" {...form.getInputProps("isActive", { type: "checkbox" })} />

          <Button type="submit" mt="md" loading={updateSmtpMutation.isPending}>
            Update Smtp
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default EditSmtpModal;
