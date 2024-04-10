import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
// imported pages
import Base from "./Base";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import FormDetails from "./pages/FormDetails";
//defining routes and what should be displayed
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<Login />} />
      <Route path="admin" element={<Admin />} />
      <Route path="admin/:formId" element={<FormDetails />} />
      <Route path="admin/new-user" element={<NewUser />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
