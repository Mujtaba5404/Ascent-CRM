import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconCreditCardRefund } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import ContraOrderModal from "./ContraOrderModal";

const ContraOrderModalButton = ({ orderId }) => {
  const [contraOrderModalOpened, { open: openContraOrderModal, close: closeContraOrderModal }] = useDisclosure(false);

  return (
    <CanAccess resource="order" action="create">
      <ContraOrderModal isOpen={contraOrderModalOpened} onClose={closeContraOrderModal} orderId={orderId} />

      <ActionIcon color="cyan" onClick={openContraOrderModal}>
        <IconCreditCardRefund size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default ContraOrderModalButton;
