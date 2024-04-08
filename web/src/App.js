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

//defining routes and what should be displayed
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Base />}>
      <Route index element={<Login />} />
      <Route path="login" element={<Login />} />
      <Route path="admin" element={<Admin />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
