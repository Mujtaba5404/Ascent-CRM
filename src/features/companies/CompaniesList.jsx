import { Avatar, Group, Paper, SimpleGrid, Stack, Text } from "@mantine/core";
import { truncate } from "lodash";
import { SERVER_URL } from "src/constants/SERVER_URL";
import DeleteCompanyButton from "./DeleteCompanyButton";
import EditCompanyModalButton from "./EditCompanyModalButton";

const CompaniesList = ({ companies = [] }) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}>
      {companies.map((company) => {
        return (
          <Paper key={company._id} p={"sm"}>
            <Group gap={0}>
              <Group gap={"xs"} mr={"auto"}>
                <Avatar src={`${SERVER_URL}${company.imgUrl}`} alt={company.title}>
                  {company.acronym}
                </Avatar>

                <Stack gap={0}>
                  <Text fw={500} tt={"capitalize"} title={company.title}>
                    {truncate(company.title, { length: 20 })}
                  </Text>
                  <Text size="xs" c={"dimmed"}>
                    {company.acronym}
                  </Text>
                </Stack>
              </Group>

              <EditCompanyModalButton company={company} />

              <DeleteCompanyButton companyId={company._id} />
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
};

export default CompaniesList;
