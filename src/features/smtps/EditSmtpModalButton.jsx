import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPencil } from "@tabler/icons-react";
import CanAccess from "src/components/CanAccess";
import EditSmtpModal from "./EditSmtpModal";

const EditSmtpModalButton = ({ smtp }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <CanAccess modelName="smtp" action="patch">
      <ActionIcon variant="subtle" onClick={open}>
        <IconPencil size={18} />
      </ActionIcon>

      <EditSmtpModal isOpen={opened} onClose={close} smtp={smtp} />
    </CanAccess>
  );
};

export default EditSmtpModalButton;
