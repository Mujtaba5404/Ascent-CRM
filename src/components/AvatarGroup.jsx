import { Avatar, Badge, Tooltip } from "@mantine/core";
import getAbbreviation from "src/utils/getAbbreviation";

const AvatarGroup = ({ items = [], maxVisible = 3, getLabel = (item) => item }) => {
  if (!items.length) return <Badge>-</Badge>;

  const visibleItems = items.slice(0, maxVisible);
  const remainingItems = items.slice(maxVisible);

  return (
    <Tooltip.Group>
      <Avatar.Group spacing="sm">
        {visibleItems.map((item, index) => {
          const label = getLabel(item);

          return (
            <Tooltip key={index} tt="capitalize" label={label}>
              <Avatar src={null} alt={label} name={label} radius="xl" color="initials">
                {getAbbreviation(label)}
              </Avatar>
            </Tooltip>
          );
        })}

        {remainingItems.length > 0 && (
          <Tooltip
            tt="capitalize"
            label={
              <>
                {remainingItems.map((item, i) => (
                  <div key={i}>{getLabel(item)}</div>
                ))}
              </>
            }
          >
            <Avatar radius="xl">+{remainingItems.length}</Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Tooltip.Group>
  );
};

export default AvatarGroup;
