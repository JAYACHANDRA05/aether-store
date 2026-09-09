import { Navigate } from "react-router-dom";

function PublicOnlyRoute({ children }) {
  const loggedInUser = JSON.parse(
    localStorage.getItem("aetherLoggedInUser")
  );

  if (loggedInUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicOnlyRoute;