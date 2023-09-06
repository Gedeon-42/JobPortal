import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

const Job = () => {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        getPosts();
    }, []);
    const getPosts = () => {
        axiosClient
            .get("posts")
            .then(({ data }) => {
                setPosts(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(true);
            });
    };
    const ondelete = (post) => {
        if (!window.confirm("are you sure you need to delete user")) {
            return;
        }
        axiosClient.delete(`/posts/${post.id}`).then(() => {
            getPosts();
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
                <h3>posts</h3>

                <Link to="/jobs/new" className="btn btn-edit">
                    add post
                </Link>
            </div>

            <div className="card animated fadeIndown">
                <table className="">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>image</th>
                            <th>name</th>
                            <th>status</th>
                            <th>author</th>
                            <th>created_at</th>
                            <th>action</th>
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
                            {posts.map((post) => (
                                <tr key={post.id}>
                                    <td>{post.id}</td>
                                    <td>
                                        {post.image_url ? (
                                            <img
                                                src={post.image_url}
                                                alt=""
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src={avatar}
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "7px",
                                                }}
                                            />
                                        )}
                                    </td>
                                    <td>{post.title}</td>
                                    <td>
                                        <p
                                            className={
                                                post.status
                                                    ? "pending"
                                                    : "notpending"
                                            }
                                        >
                                            {post.status
                                                ? "active"
                                                : "notactive"}
                                        </p>
                                    </td>
                                    {/* <td
                                        dangerouslySetInnerHTML={{
                                            __html: post.description,
                                        }}
                                    ></td> */}
                                    <td>{post.created_by}</td>
                                    <td>{post.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn btn-edit"
                                            to={"/admin/post/" + post.id}
                                        >
                                            edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(e) => ondelete(post)}
                                            className="btn-delete"
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};
export default Job;