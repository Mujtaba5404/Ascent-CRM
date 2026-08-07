import { Button, Modal, Stack, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdateCommentMutation } from "src/api/comment";

const EditCommentModal = ({ isOpen = false, onClose = () => {}, comment }) => {
  const updateCommentMutation = useUpdateCommentMutation();

  const form = useForm({ initialValues: { comment: comment.comment } });

  const handleSubmit = (values) => {
    updateCommentMutation.mutate({ commentId: comment._id, payload: values }, { onSuccess: onClose });
  };

  return (
    <Modal title={"update comment"} tt={"capitalize"} opened={isOpen} onClose={onClose}>
      <Stack component={"form"} onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea rows={4} data-autofocus placeholder="Type a new comment..." {...form.getInputProps("comment")} />

        <Button type="submit" loading={updateCommentMutation.isPending}>
          Update comment
        </Button>
      </Stack>
    </Modal>
  );
};

export default EditCommentModal;
