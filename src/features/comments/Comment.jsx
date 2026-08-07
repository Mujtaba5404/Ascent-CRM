import { Avatar, Flex, Paper, Stack, Text, useComputedColorScheme, useMantineTheme } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import formatDate from "src/utils/formatDate";
import getAbbreviation from "src/utils/getAbbreviation";
import DeleteCommentButton from "./DeleteCommentButton";
import EditCommentModalButton from "./EditCommentModalButton";

const Comment = ({ comment }) => {
  const [auth] = useLocalStorage({ key: "auth", getInitialValueInEffect: false });
  const theme = useMantineTheme();
  const colorScheme = useComputedColorScheme();

  const isSelfComment = String(comment?.user?._id) === String(auth.id);

  return (
    <Flex gap={"xs"} align="flex-end" wrap={"nowrap"} maw={{ base: "100%", sm: "50%" }} {...(isSelfComment && { direction: "row-reverse", ml: "auto" })}>
      <Avatar alt={comment?.user?.name}>{getAbbreviation(comment?.user?.name)}</Avatar>

      <Stack gap={8}>
        <Flex align={"center"} {...(isSelfComment && { direction: "row-reverse" })}>
          <Paper p={"xs"} style={{ wordBreak: "break-word" }} {...(isSelfComment ? { bg: theme.primaryColor, c: "white", ml: "xs" } : { bg: colorScheme === "dark" ? "gray.9" : "gray.1", mr: "xs" })}>
            <Text fz={"sm"} dangerouslySetInnerHTML={{ __html: comment.comment }} />
          </Paper>

          <EditCommentModalButton comment={comment} />

          <DeleteCommentButton commentId={comment._id} />
        </Flex>

        <Text size="xs" c={"dimmed"} tt={"capitalize"} {...(isSelfComment && { ta: "right" })}>
          {isSelfComment ? "You" : comment?.user?.name} &#8226; <time dateTime={comment.createdAt}>{formatDate(comment.createdAt)}</time>
        </Text>
      </Stack>
    </Flex>
  );
};

export default Comment;
