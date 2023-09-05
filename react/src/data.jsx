import { FaHome, FaProductHunt, FaUser, FaUserAlt } from "react-icons/fa";

export const menu =[
    {
        id:1,
        tittle:'main',
        listItems:[
            {
            id: 1,
            title: "Homepage",
            url: "/",
            icon: <FaHome/>,
          },
          {
            id: 2,
            title: "Profile",
            url: "/users/1",
            icon: <FaUser/>,
          },
        ]
    },
    {
        id: 2,
        title: "lists",
        listItems: [
          {
            id: 1,
            title: "Users",
            url: "/users",
            icon: <FaUserAlt/>,
          },
          {
            id: 2,
            title: "Products",
            url: "/products",
            icon: <FaProductHunt/>,
          },
        ]
         
        }
]