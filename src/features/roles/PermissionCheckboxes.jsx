import { Checkbox, Chip, Group, Stack, Text } from "@mantine/core";

const PermissionCheckboxes = ({ resource, permissionValues = [], onActionsChange, onUpdateFieldsChange }) => {
  const resourceIndex = permissionValues.findIndex((permission) => permission.resource.toLowerCase() === resource.resource.toLowerCase());

  const permissionActions = permissionValues[resourceIndex]?.actions || [];
  const permissionUpdateFields = permissionValues[resourceIndex]?.allowedUpdateFields || [];

  const canEdit = permissionActions.includes("update");

  const handleActionsChange = (actions) => onActionsChange({ resource: resource.resource, actions });
  const handleUpdateFieldsChange = (fields) => onUpdateFieldsChange({ resource: resource.resource, fields });

  return (
    <>
      <Checkbox.Group label={resource.resource} value={permissionActions} onChange={handleActionsChange}>
        <Group mt={"xs"}>
          {resource.actions.map((action, index) => {
            return <Checkbox key={index} label={action} value={action} />;
          })}
        </Group>
      </Checkbox.Group>

      {canEdit && (
        <Stack gap={4}>
          <Text size="sm" fw={500}>
            Select fields:
          </Text>
          <Chip.Group multiple value={permissionUpdateFields} onChange={handleUpdateFieldsChange}>
            <Group gap={"xs"}>
              {resource.allowedUpdateFields.map((field, index) => {
                return (
                  <Chip key={index} size="xs" value={field}>
                    {field}
                  </Chip>
                );
              })}
            </Group>
          </Chip.Group>
        </Stack>
      )}
    </>
  );
};

export default PermissionCheckboxes;
