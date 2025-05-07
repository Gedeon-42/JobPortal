import { Navigate, createBrowserRouter } from "react-router-dom";

import Signup from "./assets/views/Signup";
import Dashboard from "./assets/views/Dashboard";
import Notfound from "./assets/views/Notfound";
import DefaultLayout from "./assets/components/DefaultLayout";
import GuestLayout from "./assets/components/GuestLayout";
import Login from "./assets/views/Login";
import Users from "./assets/views/Users";
import Job from "./assets/views/Jobs";
import JobForm from "./assets/views/JobForm";
import Employers from "./assets/views/Employers";
import Applicant from "./assets/views/Applicant";
import App from "./App";
import Courses from "./assets/views/Courses";
import AddCourse from "./assets/views/AddCourse";

const router = createBrowserRouter([
    //     {
    // path:'/',
    // element:<DefaultLayout/>,
    // children:[
    //     {
    //         path:'/',
    //         element:<Navigate to='/'/>
    //     },
    //     {
    //         path:'/dashboard',
    //         element:<Dashboard/>
    //     },
    //     {
    //         path:'/users',
    //         element:<Users/>
    //     },
    //     {
    //         path:'/jobs',
    //         element:<Job/>

    //     },
    //     {
    //         path: "/jobs/new",
    //         element: <JobForm key="PostCreate" />,
    //     },
    //     {
    //         path:'/employers',
    //         element:<Employers/>

    //     },
    //     {
    //         path: "/employers/new",
    //         element: <JobForm key="PostCreate" />,
    //     },
    //     {
    //         path:'/applicants',
    //         element:<Applicant/>

    //     },
    //     {
    //         path: "/employers/new",
    //         element: <JobForm key="PostCreate" />,
    //     },

    // ]
    //     },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/",
                element: <App />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/courses",
                element: <Courses />,
            },
            {
                path: "/course/add",
                element: <AddCourse />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },

    {
        path: "*",
        element: <Notfound />,
    },
]);

export default router;
