import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute"; // Assuming this is the *corrected* version

// Public pages
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Student pages
import StudentDashboard from "./pages/student/Dashboard";
import StudentServices from "./pages/student/Services";
import StudentJobs from "./pages/student/Jobs";
import StudentApplications from "./pages/student/Applications";
import StudentOrders from "./pages/student/Orders";
import StudentMessages from "./pages/student/Messages";
import StudentProfile from "./pages/student/Profile";

// Client pages
import ClientDashboard from "./pages/client/Dashboard";
import ClientJobs from "./pages/client/Jobs";
import ClientServices from "./pages/client/Services";
import ClientOrders from "./pages/client/Orders";
import ClientMessages from "./pages/client/Messages";
import ClientProfile from "./pages/client/Profile";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminServices from "./pages/admin/Services";
import AdminJobs from "./pages/admin/Jobs";

function App() {
  return (
    <Router>
      {/* AuthProvider must wrap the entire Routes block to make context available */}
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student routes */}
          <Route
            path="/student/dashboard"
            element={
              // Note: Using 'allowedRoles' prop requires the corrected PrivateRoute.tsx
              <PrivateRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/services"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentServices />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/jobs"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/applications"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentApplications />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/orders"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/messages"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentMessages />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <PrivateRoute allowedRoles={["student"]}>
                <StudentProfile />
              </PrivateRoute>
            }
          />

          {/* Client routes */}
          <Route
            path="/client/dashboard"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <ClientDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/client/jobs"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <ClientJobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/client/services"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <ClientServices />
              </PrivateRoute>
            }
          />
          <Route
            path="/client/orders"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <ClientOrders />
              </PrivateRoute>
            }
          />
          <Route
            path="/client/messages"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <ClientMessages />
              </PrivateRoute>
            }
          />
          <Route
            path="/client/profile"
            element={
              <PrivateRoute allowedRoles={["client"]}>
                <ClientProfile />
              </PrivateRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/services"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminServices />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminJobs />
              </PrivateRoute>
            }
          />

          {/* Catch unhandled paths and redirect to the root landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
