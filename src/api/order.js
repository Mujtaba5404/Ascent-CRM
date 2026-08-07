import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetOrdersWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["orders", params],
    queryFn: () => api.get("orders", { params }).then(({ data }) => data),
  });
};

export const useGetOrdersSummaryByGroupQuery = (params) => {
  return useQuery({
    queryKey: ["orders", "summary", "byGroup", params],
    queryFn: () => api.get("orders/summary/byGroup", { params }).then(({ data }) => data),
  });
};

export const useGetOrderByIdQuery = (orderId) => {
  return useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => api.get(`orders/${orderId}`).then(({ data }) => data),
  });
};

export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("orders", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("order successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating order"),
        type: "error",
      }),
  });
};

export const useCreateContraRefundChargebackOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("orders/createContraOrder", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("order successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating order"),
        type: "error",
      }),
  });
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, payload }) => api.patch(`orders/${orderId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("order successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error updating order"),
        type: "error",
      }),
  });
};

export const useDeleteOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (orderId) => api.delete(`orders/${orderId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("order successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting order"),
        type: "error",
      }),
  });
};
