import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllSmtpsQuery } from "src/api/smtp";
import Placeholder from "src/components/Placeholder";
import AddSmtpModalButton from "./AddSmtpModalButton";
import SmtpsList from "./SmtpsList";

const Smtps = () => {
  const smtps = useGetAllSmtpsQuery();

  return (
    <Stack gap="xl">
      <AddSmtpModalButton />

      {smtps.isLoading && <Loader />}

      {smtps.isError && <Placeholder title="Error" icon={<IconX size={50} />} />}

      {smtps.isSuccess && !smtps.data?.length && <Placeholder title="No smtps to display" icon={<IconFiles size={50} />} />}

      {smtps.isSuccess && !!smtps.data?.length && <SmtpsList smtps={smtps.data} />}
    </Stack>
  );
};

export default Smtps;
