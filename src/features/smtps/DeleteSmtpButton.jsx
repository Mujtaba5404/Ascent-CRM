import { ActionIcon, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconTrash } from "@tabler/icons-react";
import { useDeleteSmtpMutation } from "src/api/smtp";
import CanAccess from "src/components/CanAccess";
import capitalizeLetters from "src/utils/capitalizeLetters";

const DeleteSmtpButton = ({ smtpId }) => {
  const deleteSmtpMutation = useDeleteSmtpMutation();

  const deleteSmtpConfirmationModal = () => {
    modals.openConfirmModal({
      title: capitalizeLetters("delete smtp confirmation"),
      centered: true,
      children: <Text size="sm">Are you sure you want to delete this smtp?</Text>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deleteSmtpMutation.mutate(smtpId);
      },
    });
  };

  return (
    <CanAccess resource="smtp" action="delete">
      <ActionIcon variant="subtle" color="red" onClick={deleteSmtpConfirmationModal}>
        <IconTrash size={18} />
      </ActionIcon>
    </CanAccess>
  );
};

export default DeleteSmtpButton;
