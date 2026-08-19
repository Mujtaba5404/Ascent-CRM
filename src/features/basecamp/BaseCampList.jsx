import { Avatar, Badge, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { truncate } from "lodash";
import { SERVER_URL } from "src/constants/SERVER_URL";
import DeleteBaseCampButton from "./DeleteBaseCampButton";

const BaseCampList = ({ basecamps = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {basecamps.map((basecamp) => {
        const title = basecamp.company?.title ?? basecamp.accountName ?? basecamp.accountId;
        const acronym = basecamp.company?.acronym;

        return (
          <Paper key={basecamp._id} p={"sm"}>
            <Group gap={0}>
              <Group gap={"xs"} mr={"auto"}>
                <Avatar src={basecamp.company?.imgUrl ? `${SERVER_URL}${basecamp.company.imgUrl}` : undefined} alt={title}>
                  {acronym}
                </Avatar>

                <Stack gap={4}>
                  <Text fw={500} tt={"capitalize"} title={title}>
                    {truncate(title, { length: 20 })}
                  </Text>

                  <Text size="xs" c={"dimmed"}>
                    {basecamp.accountName}
                  </Text>

                  {basecamp.accountId && (
                    <Badge size="xs" color="teal" variant="light" w="fit-content">
                      {basecamp.accountId}
                    </Badge>
                  )}
                </Stack>
              </Group>

              <DeleteBaseCampButton basecampId={basecamp._id} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default BaseCampList;
