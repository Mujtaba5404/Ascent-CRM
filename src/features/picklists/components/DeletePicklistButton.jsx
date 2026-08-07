import { useDeletePicklistMutation } from "src/api/picklist";
import DeleteItemButton from "src/components/DeleteItemButton";
import PICKLIST_SCOPE from "src/constants/PICKLIST_SCOPE";
import { usePicklists } from "src/context/PicklistContext";

const DeletePicklistButton = ({ picklistId }) => {
  const { scope, resource, featureName } = usePicklists();

  return <DeleteItemButton resource={scope === PICKLIST_SCOPE.RESOURCE ? resource : "picklist"} label={featureName} mutationHook={useDeletePicklistMutation} itemId={picklistId} />;
};

export default DeletePicklistButton;
