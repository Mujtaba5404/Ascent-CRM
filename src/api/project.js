import { upperFirst } from "@mantine/hooks";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showNotification } from "src/notifications/showNotification";
import api from ".";

export const useGetAllProjectsQuery = (params) => {
  return useQuery({
    queryKey: ["projects", "all", params],
    queryFn: () => api.get("projects/all", { params }).then(({ data }) => data),
  });
};

export const useGetProjectsWithPaginationQuery = (params) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => api.get("projects", { params }).then(({ data }) => data),
  });
};

export const useGetProjectsByBrandQuery = (brandId) => {
  return useQuery({
    queryKey: ["projects", "by brand", brandId],
    queryFn: () => api.get(`projects/byBrand/${brandId}`).then(({ data }) => data),
    enabled: !!brandId,
  });
};

export const useGetProjectsSummaryByGroupQuery = (params) => {
  return useQuery({
    queryKey: ["projects", "summary", "byGroup", params],
    queryFn: () => api.get("projects/summary/byGroup", { params }).then(({ data }) => data),
  });
};

export const useGetProjectByIdQuery = (clientId) => {
  return useQuery({
    queryKey: ["projects", clientId],
    queryFn: () => api.get(`projects/${clientId}`).then(({ data }) => data),
  });
};

export const useCreateProjectMutation = () => {
  const queryProject = useQueryClient();

  return useMutation({
    mutationFn: (payload) => api.post("projects/initialize", payload),
    onSuccess: () => {
      queryProject.invalidateQueries(["projects"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("project successfully created"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error creating project"),
        type: "error",
      }),
  });
};

export const useUpdateProjectMutation = () => {
  const queryProject = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }) => api.patch(`projects/${projectId}`, payload),
    onSuccess: () => {
      queryProject.invalidateQueries(["projects"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("project successfully updated"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error updating project"),
        type: "error",
      }),
  });
};

export const useDeleteProjectMutation = () => {
  const queryProject = useQueryClient();

  return useMutation({
    mutationFn: (clientId) => api.delete(`projects/${clientId}`),
    onSuccess: () => {
      queryProject.invalidateQueries(["projects"]);
      showNotification({
        title: upperFirst("done!"),
        message: upperFirst("project successfully deleted"),
        type: "success",
      });
    },
    onError: (error) =>
      showNotification({
        title: upperFirst("error!"),
        message: upperFirst(error.message || "error deleting client"),
        type: "error",
      }),
  });
};
