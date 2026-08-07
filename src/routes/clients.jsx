import { Route } from "react-router-dom";
import Protected from "src/components/Protected";
import ClientDetails from "src/features/clients/ClientDetails";
import ClientsSummaryByGroup from "src/features/clients/ClientsSummaryByGroup";
import ClientsTable from "src/features/clients/ClientsTable";
import ClientsLayout from "src/layouts/clients";

export const clientRoutes = (
  <Route path="clients" element={<Protected resource="client" action="read" />}>
    <Route element={<ClientsLayout />}>
      <Route index element={<ClientsTable />} />
      <Route path="summary" element={<ClientsSummaryByGroup />} />
    </Route>

    <Route path=":id" element={<ClientDetails />} />
  </Route>
);
