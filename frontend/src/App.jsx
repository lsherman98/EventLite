import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import SignUpForm from "./components/session/SignUpForm";
import LoginForm from "./components/session/LoginForm";
import HomePage from "./components/HomePage/HomePage";
import AdminShow from "./components/UserShowPages/AdminShow";
import UserShow from "./components/UserShowPages/UserShow"
import LikesIndex from "./components/Likes/LikesIndex";
import EventsIndex from "./components/Events/EventsIndex/EventsIndex";
import CreateEvent from "./components/Events/CreateEvent/CreateEvent";
import TicketIndex from "./components/Tickets/TicketsIndex";
import EventGenericShow from "./components/Events/EventShow/EventGenericShow";
import MyEvents from "./components/MyEvents/MyEvents";
import Footer from "./components/Footer/Footer";



const Layout = () => {

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
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
        path: '/events/:eventId',
        element: <EventGenericShow />
      },
      {
        path: '/tickets',
        element: <TicketIndex />
      },
      {
        path: '/create',
        element: <CreateEvent />
      },
      {
        path: '/myevents',
        element: <MyEvents /> 
      }
     
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App;
