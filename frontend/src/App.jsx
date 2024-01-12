import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import SignUpForm from "./components/session/SignUpForm";
import UserProfile from "./components/UserProfile/UserProfile";
import LoginForm from "./components/session/LoginForm";
import UserShow from "./components/UserProfile/UserShow";




const Layout = () => {

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <h1>Home Page</h1>,
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/signup',
        element: <SignUpForm />
      },
      {
        path: '/profile',
        element: <UserProfile />
      },
      {
        path: '/users/:userId',
        element: <UserShow />
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App;
