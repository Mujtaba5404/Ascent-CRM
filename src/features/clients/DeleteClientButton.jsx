import { useDeleteClientMutation } from "src/api/client";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteClientButton = ({ clientId, redirect = false }) => {
  return <DeleteItemButton resource="client" label="client" mutationHook={useDeleteClientMutation} itemId={clientId} navigateTo={redirect ? "/clients" : undefined} />;
};

export default DeleteClientButton;
