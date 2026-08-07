import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllCompaniesQuery } from "src/api/company";
import Placeholder from "src/components/Placeholder";
import AddCompanyModalButton from "./AddCompanyModalButton";
import CompaniesList from "./CompaniesList";

const Companies = () => {
  const companies = useGetAllCompaniesQuery();

  return (
    <Stack>
      <AddCompanyModalButton />

      {companies.isLoading && <Loader />}

      {companies.isError && <Placeholder title={"Error"} icon={<IconX size={50} />} />}

      {companies.isSuccess && !companies.data?.length && <Placeholder title={"No companies to display"} icon={<IconFiles size={50} />} />}

      {companies.isSuccess && !!companies.data?.length && <CompaniesList companies={companies.data} />}
    </Stack>
  );
};

export default Companies;
