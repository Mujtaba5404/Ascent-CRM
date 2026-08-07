import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetAllCompaniesQuery = (params) => {
  return useQuery({
    queryKey: ["companies", "all", params],
    queryFn: () => api.get("companies/all", { params }).then(({ data }) => data),
  });
};

export const useGetCompaniesWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["companies", params],
    queryFn: () => api.get("companies", { params }).then(({ data }) => data),
  });
};

export const useCreateCompanyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("companies", payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("company successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating company"),
        type: "error",
      }),
  });
};

export const useUpdateCompanyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ companyId, payload }) => api.patch(`companies/${companyId}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("company successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error updating company"),
        type: "error",
      }),
  });
};

export const useDeleteCompanyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (companyId) => api.delete(`companies/${companyId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["companies"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("company successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting company"),
        type: "error",
      }),
  });
};
