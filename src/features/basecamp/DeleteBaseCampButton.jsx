import { useDeleteBaseCampMutation } from "src/api/basecamp";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteBaseCampButton = ({ basecampId }) => {
  return <DeleteItemButton resource="basecamp" label="basecamp" mutationHook={useDeleteBaseCampMutation} itemId={basecampId} />;
};

export default DeleteBaseCampButton;
