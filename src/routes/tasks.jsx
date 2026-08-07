import { Route } from "react-router-dom";
import Protected from "src/components/Protected";
import TaskDetails from "src/features/tasks/TaskDetails";
import TasksTable from "src/features/tasks/TasksTable";
import TasksLayout from "src/layouts/tasks";

export const taskRoutes = (
  <Route path="tasks" element={<Protected resource="task" action="read" />}>
    <Route element={<TasksLayout />}>
      <Route index element={<TasksTable />} />
      <Route path="summary" element={<h1>Summary</h1>} />
    </Route>

    <Route path=":id" element={<TaskDetails />} />
  </Route>
);
