import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
//import Home from "./pages/HomePage.jsx";
//import Profile from "./pages/Profile.jsx/index.js";
//import BirdPost from "./pages/BirdPost.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      
      {
        index: true,
        element: <Home />,
      },
//      {
//        path: "/profile",
//        element: <Profile />,
//      },
      // {
      //   path: "/birdPost/:",
      //   element: <BirdPost />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
