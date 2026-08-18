import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import { upperFirst } from "@mantine/hooks";
import api from ".";

export const useGetAllSmtpsQuery = () => {
  return useQuery({
    queryKey: ["smtps", "all"],
    queryFn: async () => {
      const res = await api.get("/smtps/all");
      return res.data || [];
    },
    staleTime: Infinity,
  });
};

export const useCreateSmtpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("smtps/", payload),

    onSuccess: () => {
      queryClient.invalidateQueries(["smtps"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("smtp successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.response?.data?.message || "error creating smtp"),
        type: "error",
      }),
  });
};

export const useUpdateSmtpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ smtpId, payload }) => {
      const res = await api.patch(`smtps/${smtpId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["smtps"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("smtp successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.response?.data?.message || "error updating smtp"),
        type: "error",
      }),
  });
};

export const useDeleteSmtpMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (smtpId) => api.delete(`smtps/${smtpId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["smtps"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("smtp successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.response?.data?.message || "error deleting smtp"),
        type: "error",
      }),
  });
};
