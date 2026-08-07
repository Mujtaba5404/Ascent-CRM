import { Badge, Group, HoverCard, Stack, Text } from "@mantine/core";

const isGroupedItems = (items) => {
  return items?.length && typeof items[0] === "object" && !Array.isArray(items[0]);
};

const flattenGroupedItems = (groups = []) => {
  return groups.flatMap((group) => group.items || []);
};

const BadgesPopover = ({ items = [], maxVisible = 1, popoverWidth = 250, children }) => {
  if (!items.length) return "";

  const grouped = isGroupedItems(items);

  const flatItems = grouped ? flattenGroupedItems(items) : items;

  const visibleItems = flatItems.slice(0, maxVisible);
  const remainingCount = flatItems.length - maxVisible;
  const shouldShowPopover = flatItems.length > maxVisible;

  const badges = (
    <Group gap={4} justify="flex-start" wrap="nowrap">
      {visibleItems.map((item, index) => (
        <Badge key={index}>{item}</Badge>
      ))}

      {remainingCount > 0 && <Badge variant="light">+{remainingCount}</Badge>}
    </Group>
  );

  if (!shouldShowPopover) {
    return badges;
  }

  return (
    <HoverCard width={popoverWidth}>
      <HoverCard.Target>{children || badges}</HoverCard.Target>

      <HoverCard.Dropdown>
        {!grouped ? (
          <Group gap="xs">
            {flatItems.map((item, index) => (
              <Badge key={index}>{item}</Badge>
            ))}
          </Group>
        ) : (
          <Stack gap="sm">
            {items.map((group, index) => (
              <div key={index}>
                {!!group.group && (
                  <Text size="xs" fw={600} mb={4} c="dimmed">
                    {group.group}
                  </Text>
                )}

                <Group gap="xs">
                  {(group.items || []).map((item, itemIndex) => (
                    <Badge key={itemIndex}>{item}</Badge>
                  ))}
                </Group>
              </div>
            ))}
          </Stack>
        )}
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export default BadgesPopover;
