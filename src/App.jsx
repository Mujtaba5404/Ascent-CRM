import { Route, Routes } from "react-router-dom";
import RequireAuth from "src/components/RequireAuth";
import Login from "src/features/auth/Login";
import AppLayout from "src/layouts/AppLayout";
import Dashboard from "src/pages/Dashboard";
import NotFound from "src/pages/NotFound";
import { adminSettingsRoutes } from "src/routes/adminSettings";
import { clientRoutes } from "src/routes/clients";
import { orderRoutes } from "src/routes/orders";
import { taskRoutes } from "src/routes/tasks";
import { projectRoutes } from "./routes/projects";

const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/">
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Route>

          {/* {marketingRoutes} */}

          {/* {leadRoutes} */}

          {clientRoutes}
          
          {projectRoutes}

          {orderRoutes}

          {taskRoutes}

          {/* {assetManagementRoutes} */}

          {/* {fleetManagementRoutes} */}

          {/* {subscriptionRoutes} */}

          {/* <Route path="activities">
            <Route index element={<Activities />} />
          </Route> */}

          {/* <Route path="notes">
            <Route index element={<Notes />} />
          </Route> */}

          {/* {employeeRoutes} */}

          {/* {procurementRoutes} */}

          {/* {sittingCostRoutes} */}

          {adminSettingsRoutes}
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
