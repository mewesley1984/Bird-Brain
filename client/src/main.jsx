import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
// import SinglePost from "./pages/SinglePost.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      
      {
        index: true,
<<<<<<< HEAD
        element: <Home />,
      },      
      {
       path: "/login",
       element: <Login />,
      },
=======
        element: <Home/>,
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, 
>>>>>>> 4ad27192f20745a2f74c847321937280f8da15c8
      // {
      //   path: '/posts/:birdId',
      //   element: <SinglePost />
      // }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
