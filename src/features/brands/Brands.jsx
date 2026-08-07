import { Stack } from "@mantine/core";
import AddBrandModalButton from "./AddBrandModalButton";
import BrandsTable from "./BrandsTable";

const Brands = () => {
  return (
    <Stack>
      <AddBrandModalButton />

      <BrandsTable />
    </Stack>
  );
};

export default Brands;
