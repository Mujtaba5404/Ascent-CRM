import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetAllUsersQuery = (params) => {
  return useQuery({
    queryKey: ["users", "all", params],
    queryFn: () => api.get("users/all", { params }).then(({ data }) => data),
  });
};

export const useGetUsersWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => api.get("users", { params }).then(({ data }) => data),
  });
};

export const useGetUserByIdQuery = (userId) => {
  return useQuery({
    queryKey: ["users", userId],
    queryFn: () => api.get(`users/${userId}`).then(({ data }) => data),
    enabled: !!userId,
  });
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("users", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("user successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating user"),
        type: "error",
      }),
  });
};

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, payload }) => api.patch(`users/${userId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("user successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error updating user"),
        type: "error",
      }),
  });
};
