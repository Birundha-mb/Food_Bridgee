import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


import Home from "./pages/Home";

import Login from "./pages/Login";

import Register from "./pages/Register";

import DonorDashboard from "./pages/DonorDashboard";

import Dashboard from "./pages/Dashboard";

import Donate from "./pages/Donate";

import Tracking from "./pages/Tracking";
import Chat from "./pages/Chat";

import Admin from "./pages/Admin";

import ProtectedRoute from "./components/ProtectedRoute";

import AdminRoute from "./components/AdminRoute";


export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/donate"
          element={
            <ProtectedRoute>

              <Donate />

            </ProtectedRoute>
          }
        />

        <Route
          path="/tracking"
          element={
            <ProtectedRoute>

              <Tracking />

            </ProtectedRoute>
          }
        />
        <Route
  path="/chat"
  element={
    <ProtectedRoute>

      <Chat />

    </ProtectedRoute>
  }
/>

        <Route
          path="/admin"
          element={
            <AdminRoute>

              <Admin />

            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  );

}