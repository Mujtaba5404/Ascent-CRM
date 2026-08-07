import { ActionIcon, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCreditCardRefund, IconDots, IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDeleteOrderMutation } from "src/api/order";
import CanAccess from "src/components/CanAccess";
import DeleteItemButton from "src/components/DeleteItemButton";
import EditOrderModal from "./EditOrderModal";

const OrdersTableRowMenu = ({ order, compact = false }) => {
  const [contraOrderModalOpened, { open: openContraOrderModal, close: closeContraOrderModal }] = useDisclosure(false);
  const [editOrderModalOpened, { open: openEditOrderModal, close: closeEditOrderModal }] = useDisclosure(false);

  return (
    <>
      {/* <ContraOrderModal isOpen={contraOrderModalOpened} onClose={closeContraOrderModal} orderId={order._id} /> */}
      <EditOrderModal isOpen={editOrderModalOpened} onClose={closeEditOrderModal} order={order} compact={compact} />

      <Menu position="bottom-end">
        <Menu.Target>
          <ActionIcon>
            <IconDots size={18} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <CanAccess resource="order" action="read">
            <Menu.Item component={Link} to={`/orders/${order._id}`} leftSection={<IconEye size={18} />}>
              View
            </Menu.Item>
          </CanAccess>

          <CanAccess resource="order" action="update">
            <Menu.Item leftSection={<IconPencil size={18} />} onClick={openEditOrderModal}>
              Edit
            </Menu.Item>
          </CanAccess>

          {/* <CanAccess resource="order" action="create">
            <Menu.Item leftSection={<IconCreditCardRefund size={18} />} onClick={openContraOrderModal}>
              Create refund/CB
            </Menu.Item>
          </CanAccess> */}

          <Menu.Divider />

          <DeleteItemButton resource="order" label="order" mutationHook={useDeleteOrderMutation} itemId={order._id}>
            <Menu.Item color="red" leftSection={<IconTrash size={18} />} onClick={(e) => e.stopPropagation()}>
              Delete
            </Menu.Item>
          </DeleteItemButton>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default OrdersTableRowMenu;
