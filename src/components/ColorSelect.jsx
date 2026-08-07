import { ColorSwatch, Group, Select, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import getColorSwatches from "src/utils/getColorSwatches";

const COLOR_SWATCHES = getColorSwatches(["dark"], 4);

const iconProps = {
  stroke: 1.5,
  color: "currentColor",
  opacity: 0.6,
  size: 18,
};

const renderOption = ({ option, checked }) => {
  return (
    <Group gap={"sm"} flex={1}>
      <ColorSwatch size={24} radius={"sm"} color={option.value} />

      <Text size="xs" tt={"uppercase"} fw={500}>
        {option.label}
      </Text>

      {checked && <IconCheck style={{ marginInlineStart: "auto" }} {...iconProps} />}
    </Group>
  );
};

const ColorSelect = (props) => {
  return <Select data={COLOR_SWATCHES} renderOption={renderOption} {...props} />;
};

export default ColorSelect;
