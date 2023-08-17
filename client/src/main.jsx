import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import SinglePost from "./pages/SinglePost.jsx"
import PostForm from "./components/PostForm"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Error occured! Check console for details.</h1>,
    children: [
      
      {
        index: true,
        element: <Home/>,
      }, 
      {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, 
      {
        path: '/posts/:birdId',
        element: <SinglePost />
      }, 
      {
        path: '/create-post',
        element: <PostForm />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <RouterProvider router={router}> 
      <App />
    </RouterProvider> 
  </React.StrictMode>
);