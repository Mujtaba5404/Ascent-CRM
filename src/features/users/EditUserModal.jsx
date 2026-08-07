import { Button, Modal, PasswordInput, ScrollArea, Stack, Switch, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateUserMutation } from "src/api/user";
import BrandsMultiSelect from "src/features/brands/BrandsMultiSelect";
import CompaniesMultiSelect from "src/features/companies/CompaniesMultiSelect";
import RolesMultiSelect from "src/features/roles/RolesMultiSelect";

const EditUserModal = ({ isOpen = false, onClose = () => {}, user }) => {
  const updateUserMutation = useUpdateUserMutation();

  const form = useForm({
    initialValues: {
      name: user.name,
      email: user.email,
      password: "",
      companies: user?.companies?.map((company) => company?._id),
      brands: user?.brands?.map((brand) => brand?._id),
      roles: user?.roles?.map((role) => role?._id),
      isActive: user.isActive,
    },
  });

  form.watch("companies", ({ dirty }) => {
    if (dirty) {
      form.setFieldValue("brands", []);
    }
  });

  const handleSubmit = (values) => {
    updateUserMutation.mutate(
      { userId: user._id, payload: values },
      {
        onSuccess: () => {
          onClose();
          form.setFieldValue("password", "");
        },
      },
    );
  };

  return (
    <Modal title={"update user"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <ScrollArea h={400}>
          <Stack>
            <TextInput required label="name" data-autofocus {...form.getInputProps("name")} />
            <TextInput required type="email" label="email" {...form.getInputProps("email")} />
            <PasswordInput label="password" placeholder="Type only for a new password" {...form.getInputProps("password")} />
            <CompaniesMultiSelect
              multiSelectProps={{
                required: true,
                label: "companies",
                ...form.getInputProps("companies"),
              }}
            />
            <BrandsMultiSelect
              multiSelectProps={{
                required: true,
                label: "brands",
                ...form.getInputProps("brands"),
              }}
              queryObject={{ company: form.getValues().companies }}
            />
            <RolesMultiSelect multiSelectProps={{ required: true, label: "roles", ...form.getInputProps("roles") }} />
            <Switch label="is active" {...form.getInputProps("isActive", { type: "checkbox" })} />
          </Stack>
        </ScrollArea>

        <Button fullWidth type="submit" mt={"md"} loading={updateUserMutation.isPending}>
          Update user
        </Button>
      </form>
    </Modal>
  );
};

export default EditUserModal;
