import { useDeleteCompanyMutation } from "src/api/company";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteCompanyButton = ({ companyId }) => {
  return <DeleteItemButton resource="company" label="company" mutationHook={useDeleteCompanyMutation} itemId={companyId} />;
};

export default DeleteCompanyButton;
