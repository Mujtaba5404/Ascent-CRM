import { Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import DeleteSmtpButton from "./DeleteSmtpButton";
import EditSmtpModalButton from "./EditSmtpModalButton";
import { truncate } from "lodash";

const SmtpsList = ({ smtps = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {smtps.map((smtp) => {
        return (
          <Paper key={smtp._id} p="sm" withBorder>
            <Stack gap={4}>
              <Group gap="sm" justify="space-between">
                <Text fw={500} mr="auto">
                  {truncate(smtp.name, { length: 20 })}
                </Text>

                <EditSmtpModalButton smtp={smtp} />

                <DeleteSmtpButton smtpId={smtp._id} />
              </Group>

              <Text size="sm" c="dimmed">
                {truncate(smtp.email, { length: 30 })}
              </Text>
            </Stack>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default SmtpsList;
