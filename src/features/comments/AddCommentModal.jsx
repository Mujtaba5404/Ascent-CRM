import { Button, Modal, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCreateCommentMutation } from "src/api/comment";

const AddCommentModal = ({ isOpen = false, onClose = () => {}, resource, resourceId }) => {
  const createCommentMutation = useCreateCommentMutation();

  const form = useForm({ initialValues: { comment: "" } });

  const handleSubmit = (values) => {
    const payload = { ...values, resource, resourceId };

    createCommentMutation.mutate(payload, {
      onSuccess: () => {
        onClose();
        form.reset();
      },
    });
  };

  return (
    <Modal title={"add comment"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea rows={4} data-autofocus placeholder="Type a new comment..." {...form.getInputProps("comment")} />

        <Button type="submit" loading={createCommentMutation.isPending}>
          Add comment
        </Button>
      </Stack>
    </Modal>
  );
};

export default AddCommentModal;
