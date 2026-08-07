import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetAllBrandsQuery = (params) => {
  return useQuery({
    queryKey: ["brands", "all", params],
    queryFn: () => api.get("brands/all", { params }).then(({ data }) => data),
  });
};

export const useGetBrandsWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["brands", params],
    queryFn: () => api.get("brands", { params }).then(({ data }) => data),
  });
};

export const useCreateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("brands", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("brand successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating brand"),
        type: "error",
      }),
  });
};

export const useUpdateBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ brandId, payload }) => api.patch(`brands/${brandId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("brand successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error updating brand"),
        type: "error",
      }),
  });
};

export const useDeleteBrandMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (brandId) => api.delete(`brands/${brandId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("brand successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting brand"),
        type: "error",
      }),
  });
};
