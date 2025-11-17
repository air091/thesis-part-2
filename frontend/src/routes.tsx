import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import CardsManagement from "./pages/admin/CardsManagement.tsx";
import SessionsManagement from "./pages/admin/SessionsManagement.tsx";
import Payments from "./pages/admin/Payments.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "cards-management",
        element: <CardsManagement />,
      },
      {
        path: "sessions-management",
        element: <SessionsManagement />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
