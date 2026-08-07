import { useDeleteCommentMutation } from "src/api/comment";
import DeleteItemButton from "src/components/DeleteItemButton";

const DeleteCommentButton = ({ commentId }) => {
  return <DeleteItemButton resource="comment" label="comment" mutationHook={useDeleteCommentMutation} itemId={commentId} />;
};

export default DeleteCommentButton;
