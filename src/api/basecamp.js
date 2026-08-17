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
