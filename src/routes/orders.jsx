import { Route } from "react-router-dom";
import Protected from "src/components/Protected";
import OrderDetails from "src/features/orders/OrderDetails";
import OrdersSummaryByGroup from "src/features/orders/OrdersSummaryByGroup";
import OrdersTable from "src/features/orders/OrdersTable";
import OrdersLayout from "src/layouts/orders";

export const orderRoutes = (
  <Route path="orders" element={<Protected resource="order" action="read" />}>
    <Route element={<OrdersLayout />}>
      <Route index element={<OrdersTable />} />
      <Route path="summary" element={<OrdersSummaryByGroup />} />
    </Route>

    <Route path=":id" element={<OrderDetails />} />
  </Route>
);
