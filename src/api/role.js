import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetAllRolesQuery = () => {
  return useQuery({
    queryKey: ["roles", "all"],
    queryFn: () => api.get("roles/all").then(({ data }) => data),
  });
};

export const useGetRolesWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["roles", params],
    queryFn: () => api.get("roles", { params }).then(({ data }) => data),
  });
};

export const useGetAllResourcesQuery = () => {
  return useQuery({
    queryKey: ["roles", "resources"],
    queryFn: () => api.get("roles/resources").then(({ data }) => data),
  });
};

export const useGetAllScopesQuery = () => {
  return useQuery({
    queryKey: ["roles", "scopes"],
    queryFn: () => api.get("roles/scopes").then(({ data }) => data),
  });
};

export const useCreateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("roles", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("role successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating role"),
        type: "error",
      }),
  });
};

export const useUpdateRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ roleId, payload }) => api.patch(`roles/${roleId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("role successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error updating role"),
        type: "error",
      }),
  });
};

export const useDeleteRoleMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (roleId) => api.delete(`roles/${roleId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["roles"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("role successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting role"),
        type: "error",
      }),
  });
};
