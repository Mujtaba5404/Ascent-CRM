import { Group } from "@mantine/core";
import DeleteBrandButton from "./DeleteBrandButton";
import EditBrandModalButton from "./EditBrandModalButton";

const BrandsTableRowActions = ({ brand }) => {
  return (
    <Group gap={"sm"} justify="center" wrap="nowrap">
      <EditBrandModalButton brand={brand} />

      <DeleteBrandButton brandId={brand._id} />
    </Group>
  );
};

export default BrandsTableRowActions;
