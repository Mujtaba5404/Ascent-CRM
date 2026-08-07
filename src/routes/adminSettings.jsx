import { Route } from "react-router-dom";
import Brands from "src/features/brands/Brands";
import Companies from "src/features/companies/Companies";
import Roles from "src/features/roles/Roles";
import Users from "src/features/users/Users";
import AdminSettings from "src/pages/AdminSettings";
import { picklistRoutes } from "./picklists";

export const adminSettingsRoutes = (
  <Route path="admin-settings" element={<AdminSettings />}>
    <Route index element={<Companies />} />
    <Route path="companies" element={<Companies />} />
    <Route path="brands" element={<Brands />} />
    <Route path="users" element={<Users />} />
    <Route path="role-and-permissions" element={<Roles />} />
    {/* <Route path="lead-status" element={<LeadStatus />} /> */}
    {/* <Route path="client-categories" element={<ClientCategories />} /> */}
    {/* <Route path="order-payment-types" element={<OrderPaymentTypes />} /> */}
    {/* <Route path="uploads" element={<Uploads />} /> */}

    {picklistRoutes}
  </Route>
);
