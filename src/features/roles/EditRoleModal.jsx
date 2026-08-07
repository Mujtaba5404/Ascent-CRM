import { Button, Modal, Paper, ScrollArea, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useGetAllResourcesQuery, useUpdateRoleMutation } from "src/api/role";
import PermissionCheckboxes from "./PermissionCheckboxes";
import ScopesSelect from "./ScopesSelect";

const EditRoleModal = ({ isOpen = false, onClose = () => {}, role }) => {
  const resources = useGetAllResourcesQuery();
  const updateRoleMutation = useUpdateRoleMutation();

  const form = useForm({
    initialValues: {
      title: role.title,
      scope: role.scope,
      permissions: role.permissions,
      indexPath: role.indexPath,
    },
    transformValues: (values) => ({
      ...values,
      permissions: values.permissions.filter((permission) => !!permission.resource),
    }),
  });

  const handleSubmit = (values) => {
    updateRoleMutation.mutate({ roleId: role._id, payload: values }, { onSuccess: onClose });
  };

  const getResourceIndex = (resource) => form.getValues().permissions.findIndex((permission) => permission.resource.toLowerCase() === resource.toLowerCase());

  const handleActionsChange = ({ resource = "", actions = [] }) => {
    const resourceIndex = getResourceIndex(resource);

    if (resourceIndex === -1 && !!actions.length) {
      form.insertListItem("permissions", { resource, actions });
    }

    if (resourceIndex !== -1 && !!actions.length) {
      form.setFieldValue(`permissions.${resourceIndex}.actions`, actions);

      if (!actions.find((action) => action === "update")) {
        form.setFieldValue(`permissions.${resourceIndex}.allowedUpdateFields`, []);
      }
    }

    if (resourceIndex !== -1 && !actions.length) {
      form.removeListItem("permissions", resourceIndex);
    }
  };

  const handleUpdateFieldsChange = ({ resource = "", fields = [] }) => {
    const resourceIndex = getResourceIndex(resource);

    const resourceActions = form.getValues().permissions[resourceIndex]?.actions || [];

    const canEdit = resourceActions.includes("update");

    if (canEdit) {
      form.setFieldValue(`permissions.${resourceIndex}.allowedUpdateFields`, fields);
    }
  };

  return (
    <Modal title={"update role"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput required label="title" data-autofocus {...form.getInputProps("title")} />
        <ScopesSelect selectProps={{ required: true, label: "scope", ...form.getInputProps("scope") }} />
        <TextInput required label="index path" data-autofocus {...form.getInputProps("indexPath")} />

        {resources.isLoading && <Skeleton height={36} />}

        {resources.isSuccess && !!resources.data?.length && (
          <Stack gap={2}>
            <Text size="sm" fw={500}>
              permissions
            </Text>

            <Paper p={"sm"} pr={0}>
              <ScrollArea h={200}>
                <Stack>
                  {resources.data.map((resource, index) => {
                    return (
                      <PermissionCheckboxes
                        key={index}
                        resource={resource}
                        permissionValues={form.getValues().permissions}
                        onActionsChange={handleActionsChange}
                        onUpdateFieldsChange={handleUpdateFieldsChange}
                      />
                    );
                  })}
                </Stack>
              </ScrollArea>
            </Paper>
          </Stack>
        )}

        <Button type="submit" fullWidth mt="md" loading={updateRoleMutation.isPending}>
          Update role
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditRoleModal;
