import { Route } from "react-router-dom";
import Protected from "src/components/Protected";
import ProjectDetails from "src/features/projects/ProjectDetails";
import ProjectsSummaryByGroup from "src/features/projects/ProjectsSummaryByGroup";
import ProjectsTable from "src/features/projects/ProjectsTable";
import ProjectsLayout from "src/layouts/projects";

export const projectRoutes = (
  <Route path="projects" element={<Protected resource="project" action="read" />}>
    <Route element={<ProjectsLayout />}>
      <Route index element={<ProjectsTable />} />
      <Route path="summary" element={<ProjectsSummaryByGroup />} />
    </Route>

    <Route path=":id" element={<ProjectDetails />} />
  </Route>
);
