import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
//import Surveys from "./Surveys";
const Users = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUser] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);
    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                //console.log(data);
                setUser(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };
    const ondelete = (u) => {
        if (!window.confirm("are you sure you need to delete user")) {
            return;
        }
        axiosClient.delete(`/users/${u.id}`).then(() => {
            getUsers();
        });
    };

    return (
        <div>
            <div
                className="user-header"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <h3>users</h3>
                <Link to="/admin/users/new" className="btn btn-add">
                    add user
                </Link>
            </div>

            <div className="table-card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>full name</th>
                            <th>email</th>
                            <th>created_at</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {loading && (
                                <td colSpan={5} className="text-center">
                                    <p>Loding...</p>
                                </td>
                            )}
                        </tr>
                    </tbody>
                    {!loading && (
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    
                                    
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};
export default Users;