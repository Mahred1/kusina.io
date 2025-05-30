import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();
  
  return (
    <div>
      {!user && !authLoading ? (
        <Navigate to={"/login"} replace={true} />
      ) : (
        children
      )}
    </div>
  );
}

export default ProtectedRoute;
