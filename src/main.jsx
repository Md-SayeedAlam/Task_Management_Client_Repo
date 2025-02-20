import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Error from "./Components/Error";
import Home from "./Components/Home";
import AuthProvider from "./Components/AuthProvider/AuthProvider";
import Login from "./Components/Login";
import TasksPage from "./Components/TasksPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import {
  QueryClient,
  QueryClientProvider,
  
} from "@tanstack/react-query";

const queryClient = new QueryClient();




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element:<Home></Home>
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/taskPage',
        element:<PrivateRoute><TasksPage></TasksPage></PrivateRoute>,
      },

    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
