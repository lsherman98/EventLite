import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import SignUpForm from "./components/session/SignUpForm";
import LoginForm from "./components/session/LoginForm";
import HomePage from "./components/HomePage/HomePage";
import AdminShow from "./components/ShowPages/AdminShow";
import UserShow from "./components/ShowPages/UserShow"
import LikesIndex from "./components/Likes/LikesIndex";
import EventsIndex from "./components/EventsIndex/EventsIndex";




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
        element: <HomePage />,
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
        element: <AdminShow />
      },
      {
        path: '/users/:userId',
        element: <UserShow />
      },
      {
        path: '/likes',
        element: <LikesIndex />
      },
      {
        path: '/events',
        element: <EventsIndex />
      },
      {
        path: '/tickets',
        element: <h1>tickets</h1>
      },
     
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App;
