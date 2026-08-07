import AddButton from "src/components/AddButton";
import CanAccess from "src/components/CanAccess";
import PICKLIST_SCOPE from "src/constants/PICKLIST_SCOPE";
import { usePicklists } from "src/context/PicklistContext";

const AddPicklistModalButton = () => {
  const { featureName, scope, resource, openCreateModal } = usePicklists();

  return (
    <CanAccess resource={scope === PICKLIST_SCOPE.RESOURCE ? resource : "picklist"} action="create">
      <AddButton title={`create ${featureName}`} subtitle={`add a new ${featureName}`} onClick={openCreateModal} />
    </CanAccess>
  );
};

export default AddPicklistModalButton;
