import React from "react";
import Home from "./components/Home";
import MainLayout from "./layouts/MainLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";

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
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
