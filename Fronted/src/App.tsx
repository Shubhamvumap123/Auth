import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.js";
import UserDetails from "./pages/UserDetails.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import Register from "./pages/Resister.tsx"; // ⬅ Add this

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterRedirect />} />
          <Route path="/login" element={<LoginRedirect />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <UserDetails />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

function LoginRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Login />;
}
function RegisterRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Register />;
}
