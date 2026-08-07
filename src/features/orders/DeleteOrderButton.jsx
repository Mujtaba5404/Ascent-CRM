import { useDeleteOrderMutation } from "src/api/order";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteOrderButton = ({ orderId, redirect = false }) => {
  return <DeleteItemButton resource="order" label="order" mutationHook={useDeleteOrderMutation} itemId={orderId} navigateTo={redirect ? "/orders" : undefined} />;
};

export default DeleteOrderButton;
