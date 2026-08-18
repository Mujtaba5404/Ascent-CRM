import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from ".";
import { upperFirst } from "@mantine/hooks";
import { showNotification } from "src/notifications/showNotification";

export const useGetAllBasecampQuery = (params) => {
  return useQuery({
    queryKey: ["basecamps", "all", params],
    queryFn: () => api.get("basecamps/all", { params }).then(({ data }) => data),
  });
};
export const useGetBasecampTemplateQuery = (basecamp) => {
  return useQuery({
    queryKey: ["basecamps", "template", basecamp],
    queryFn: () => api.get("basecamps/template", { params: { basecamp } }).then(({ data }) => data),
    enabled: !!basecamp,
  });
};

export const useConnectBasecampMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("basecamps/connect", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["basecamps"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("basecamp successfully connected"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error connecting basecamp"),
        type: "error",
      }),
  });
};

export const useDeleteBaseCampMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyId) => api.delete(`basecamps/${companyId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["basecamps"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("basecamp successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting basecamp"),
        type: "error",
      }),
  });
};
