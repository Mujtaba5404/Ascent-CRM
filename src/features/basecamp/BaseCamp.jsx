import { Loader, Stack } from "@mantine/core";
import { IconFiles, IconX } from "@tabler/icons-react";
import { useGetAllBasecampQuery } from "src/api/basecamp";
import Placeholder from "src/components/Placeholder";
import AddBaseCampModalButton from "./AddBaseCampModalButton";
import BaseCampList from "./BaseCampList";

const BaseCamp = () => {
  const basecamp = useGetAllBasecampQuery();

  return (
    <Stack>
      <AddBaseCampModalButton />

      {basecamp.isLoading && <Loader />}

      {basecamp.isError && <Placeholder title={"Error"} icon={<IconX size={50} />} />}

      {basecamp.isSuccess && !basecamp.data?.length && <Placeholder title={"No basecamps to display"} icon={<IconFiles size={50} />} />}

      {basecamp.isSuccess && !!basecamp.data?.length && <BaseCampList basecamps={basecamp.data} />}
    </Stack>
  );
};

export default BaseCamp;
