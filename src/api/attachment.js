import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetAttachmentByIdQuery = (attachmentId) => {
  return useQuery({
    queryKey: ["attachments", attachmentId],
    queryFn: () => api.get(`attachments/${attachmentId}`).then(({ data }) => data),
  });
};

export const useGetAttachmentsByResourceQuery = ({ resource, resourceId }) => {
  return useQuery({
    queryKey: ["attachments", resource, resourceId],
    queryFn: () => api.get(`attachments/resource/${resource}/${resourceId}`).then(({ data }) => data),
  });
};

export const useAddAttachmentsByResourceMutation = (resource, resourceId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post(`attachments/${resource}/${resourceId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["attachments"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("attachments successfully added"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error adding attachments"),
        type: "error",
      }),
  });
};

export const useDeleteAttachmentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (attachmentId) => api.delete(`attachments/${attachmentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["attachments"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("attachment successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting attachment"),
        type: "error",
      }),
  });
};
