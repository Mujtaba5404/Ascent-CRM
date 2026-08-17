import { Avatar, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { truncate } from "lodash";
import { SERVER_URL } from "src/constants/SERVER_URL";
import DeleteBaseCampButton from "./DeleteBaseCampButton";
import EditBaseCampModalButton from "./EditBaseCampModalButton";

const BaseCampList = ({ basecamps = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {basecamps.map((basecamp) => {
        const title = basecamp.company?.title ?? basecamp.accountName;
        const acronym = basecamp.company?.acronym;

        return (
          <Paper key={basecamp._id} p={"sm"}>
            <Group gap={0}>
              <Group gap={"xs"} mr={"auto"}>
                <Avatar src={basecamp.company?.imgUrl ? `${SERVER_URL}${basecamp.company.imgUrl}` : undefined} alt={title}>
                  {acronym}
                </Avatar>

                <Stack gap={0}>
                  <Text fw={500} tt={"capitalize"} title={title}>
                    {truncate(title, { length: 20 })}
                  </Text>
                  <Text size="xs" c={"dimmed"}>
                    {basecamp.accountName}
                  </Text>
                </Stack>
              </Group>

              <EditBaseCampModalButton basecamp={basecamp} />
              <DeleteBaseCampButton basecampId={basecamp._id} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default BaseCampList;
