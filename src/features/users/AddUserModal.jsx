import { Button, Modal, PasswordInput, ScrollArea, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateUserMutation } from "src/api/user";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import CompaniesMultiSelect from "src/features/companies/CompaniesMultiSelect";
import RolesMultiSelect from "src/features/roles/RolesMultiSelect";

const AddUserModal = ({ isOpen = false, onClose = () => {} }) => {
  const createUserMutation = useCreateUserMutation();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "Abcd1234",
      companies: [],
      brands: [],
      roles: [],
      isActive: true,
    },
  });

  form.watch("companies", ({ dirty }) => {
    if (dirty) {
      form.setFieldValue("brands", []);
    }
  });

  const handleSubmit = (values) => {
    createUserMutation.mutate(values, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  const renderBrandsMultiSelect = !!form.getValues().companies.length && (
    <BrandsMultiSelect multiSelectProps={{ required: true, label: "brands", ...form.getInputProps("brands") }} queryObject={{ company: form.getValues().companies }} />
  );

  return (
    <Modal title={"create user"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea h={400}>
          <Stack>
            <TextInput required label="name" data-autofocus {...form.getInputProps("name")} />
            <TextInput required type="email" label="email" {...form.getInputProps("email")} />
            <PasswordInput required label="password" {...form.getInputProps("password")} />
            <CompaniesMultiSelect
              multiSelectProps={{
                required: true,
                label: "companies",
                ...form.getInputProps("companies"),
              }}
            />
            {renderBrandsMultiSelect}
            <RolesMultiSelect multiSelectProps={{ required: true, label: "roles", ...form.getInputProps("roles") }} />
            <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />
          </Stack>
        </ScrollArea>

        <Button fullWidth type="submit" mt={"md"} loading={createUserMutation.isPending}>
          Create user
        </Button>
      </form>
    </Modal>
  );
};

export default AddUserModal;
