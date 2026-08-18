import { Route } from "react-router-dom";
import Brands from "src/features/brands/Brands";
import Companies from "src/features/companies/Companies";
import Roles from "src/features/roles/Roles";
import Users from "src/features/users/Users";
import AdminSettings from "src/pages/AdminSettings";
import { picklistRoutes } from "./picklists";
import BaseCamp from "src/features/basecamp/BaseCamp";
import Smtps from "src/features/smtps/Smtps";

export const adminSettingsRoutes = (
  <Route path="admin-settings" element={<AdminSettings />}>
    <Route index element={<BaseCamp />} />
    <Route path="basecamp" element={<BaseCamp />} />
    <Route path="companies" element={<Companies />} />
    <Route path="brands" element={<Brands />} />
    <Route path="smtps" element={<Smtps />} />
    <Route path="users" element={<Users />} />
    <Route path="role-and-permissions" element={<Roles />} />
    {/* <Route path="lead-status" element={<LeadStatus />} /> */}
    {/* <Route path="client-categories" element={<ClientCategories />} /> */}
    {/* <Route path="order-payment-types" element={<OrderPaymentTypes />} /> */}
    {/* <Route path="uploads" element={<Uploads />} /> */}

    {picklistRoutes}
  </Route>
);
