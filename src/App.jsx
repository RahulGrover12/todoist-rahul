import React from "react";
import Home from "./components/Home";
import MainLayout from "./layouts/MainLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="/inbox" element={<Home />} />
      <Route path="/today" element={<Home />} />
      <Route path="/:project" element={<Home />} />
      <Route path="*" element={<h1>Not Found</h1>} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
