import { Navigate } from "react-router-dom";
import useCanAccess from "src/hooks/useCanAccess";

const CanAccess = ({ resource = "", action = "", redirect = false, redirectPath = "", options = { resourcesMode: "any", actionsMode: "any" }, children }) => {
  const hasAccess = useCanAccess(resource, action, options);

  if (hasAccess) {
    return children;
  }

  return redirect ? <Navigate to={redirectPath ?? -1} replace /> : null;
};

export default CanAccess;
