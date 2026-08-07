import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetTasksWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["tasks", params],
    queryFn: () => api.get("tasks", { params }).then(({ data }) => data),
  });
};

export const useGetTasksSummaryByGroupQuery = (params) => {
  return useQuery({
    queryKey: ["tasks", "summary", "byGroup", params],
    queryFn: () => api.get("tasks/summary/byGroup", { params }).then(({ data }) => data),
  });
};

export const useGetTaskByIdQuery = (taskId) => {
  return useQuery({
    queryKey: ["tasks", taskId],
    queryFn: () => api.get(`tasks/${taskId}`).then(({ data }) => data),
  });
};

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("tasks", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("task successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating task"),
        type: "error",
      }),
  });
};

export const useUpdateTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, payload }) => api.patch(`tasks/${taskId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("task successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error updating task"),
        type: "error",
      }),
  });
};

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskId) => api.delete(`tasks/${taskId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("task successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting task"),
        type: "error",
      }),
  });
};
