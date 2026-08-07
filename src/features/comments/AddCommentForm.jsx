import { ActionIcon, Box, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconMessagePlus } from "@tabler/icons-react";
import { useCreateCommentMutation } from "src/api/comment";
import CanAccess from "src/components/CanAccess";

const AddCommentForm = ({ resource, resourceId }) => {
  const createCommentMutation = useCreateCommentMutation();

  const form = useForm({ initialValues: { comment: "" } });

  const handleSubmit = (values) => {
    const payload = { ...values, resource, resourceId };

    createCommentMutation.mutate(payload, { onSuccess: () => form.reset() });
  };

  return (
    <CanAccess resource="comment" action="create">
      <Box component="form" onSubmit={form.onSubmit(handleSubmit)} style={{ position: "relative" }} mt={"md"}>
        <Textarea required rows={4} placeholder="Type a new comment..." {...form.getInputProps("comment")} />

        <ActionIcon type="submit" style={{ position: "absolute", bottom: 4, right: 4 }} loading={createCommentMutation.isPending}>
          <IconMessagePlus size={18} />
        </ActionIcon>
      </Box>
    </CanAccess>
  );
};

export default AddCommentForm;
