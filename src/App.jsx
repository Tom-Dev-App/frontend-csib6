import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./Home";
import Dashboard from "./pages/Dashboard";
import CreateUser from "./pages/users/CreateUser";
import Notfound from "./NotFound";
import EditUser from "./pages/users/EditUser";
import AuthenticatedRoute from "./protect-routes/AuthenticatedRoute";
import PublicRoute from "./protect-routes/PublicRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route element={<AuthenticatedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/create" element={<CreateUser />} />
          <Route path="/dashboard/edit/:id" element={<EditUser />} />
        </Route>

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
