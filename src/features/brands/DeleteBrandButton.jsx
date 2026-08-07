import { useDeleteBrandMutation } from "src/api/brand";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteBrandButton = ({ brandId }) => {
  return <DeleteItemButton resource="brand" label="brand" mutationHook={useDeleteBrandMutation} itemId={brandId} />;
};

export default DeleteBrandButton;
