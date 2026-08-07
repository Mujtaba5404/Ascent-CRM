import { Button, Flex, Group, Loader, Paper, ScrollArea, Stack, TextInput } from "@mantine/core";
import { useDebouncedValue, useIntersection } from "@mantine/hooks";
import { IconMessages, IconX } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { useGetCommentsWithPaginationInfiniteQuery } from "src/api/comment";
import Placeholder from "src/components/Placeholder";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";

const CommentBox = ({ resource, resourceId }) => {
  const [comment, setComment] = useState("");
  const [debouncedComment] = useDebouncedValue(comment, 500);

  const comments = useGetCommentsWithPaginationInfiniteQuery({ query: { resourceId, comment: debouncedComment } });
  const fetchMoreComments = () => comments.fetchNextPage();

  const [scrollToBottom, setScrollToBottom] = useState(true);

  const scrollAreaRef = useRef(null);
  const { ref, entry } = useIntersection({ root: scrollAreaRef.current, threshold: 1 });

  useEffect(() => {
    if (entry?.isIntersecting) {
      fetchMoreComments();
    }
  }, [entry?.isIntersecting]);

  useEffect(() => {
    if (comments.isSuccess && scrollToBottom) {
      scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current?.scrollHeight });

      setScrollToBottom(false);
    }
  }, [comments.isSuccess]);

  return (
    <Stack>
      <TextInput placeholder="Search comment..." value={comment} onChange={(e) => setComment(e.target.value)} />

      <Paper p={"md"}>
        {comments.isLoading && <Loader />}

        {comments.isError && <Placeholder title={"Error"} icon={<IconX size={50} />} />}

        {comments.isSuccess && !comments.data.pages[0]?.meta.totalCount && <Placeholder title={"No comments to show"} icon={<IconMessages size={50} />} />}

        {comments.isSuccess && !!comments.data.pages[0]?.meta.totalCount && (
          <ScrollArea.Autosize h={375} viewportRef={scrollAreaRef}>
            {comments.hasNextPage && (
              <Group justify="center" ref={ref}>
                <Button size="xs" onClick={fetchMoreComments} loading={comments.isFetchingNextPage}>
                  Load more
                </Button>
              </Group>
            )}

            <Flex direction={"column-reverse"}>
              {comments.data.pages.map((page) => {
                return page.data.map((comment) => <Comment key={comment._id} comment={comment} />);
              })}
            </Flex>
          </ScrollArea.Autosize>
        )}

        <AddCommentForm resource={resource} resourceId={resourceId} />
      </Paper>
    </Stack>
  );
};

export default CommentBox;
