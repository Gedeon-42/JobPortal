import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";

const Employers = () => {
    const [loading, setLoading] = useState(false);
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        getJobs();
    }, []);
    const getJobs = () => {
        axiosClient
            .get("jobs")
            .then(({ data }) => {
                setJobs(data.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(true);
            });
    };
    const ondelete = (job) => {
        if (!window.confirm("are you sure you need to delete user")) {
            return;
        }
        axiosClient.delete(`/jobs/${job.id}`).then(() => {
            getJobs();
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
                    add jobs
                </Link>
            </div>

            <div className="card animated fadeIndown">
                <table className="">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>image</th>
                            <th>title</th>
                            <th>location</th>
                            <th>company</th>
                            <th>website</th>
                            <th>email</th>
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
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.id}</td>
                                    <td>
                                        {job.image_url ? (
                                            <img
                                                src={job.image_url}
                                                alt=""
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                }}
                                            />
                                        ) : (
                                            <img
                                                src=""
                                                style={{
                                                    width: "50px",
                                                    height: "50px",
                                                    borderRadius: "7px",
                                                }}
                                            />
                                        )}
                                    </td>
                                    
                                    {/* <td
                                        dangerouslySetInnerHTML={{
                                            __html: post.description,
                                        }}
                                    ></td> */}
                                    <td>{job.title}</td>
                                    <td>{job.location}</td>
                                    <td>{job.company}</td>
                                    <td>{job.website}</td>
                                    <td>{job.email}</td>
                                    <td>
                                        <Link
                                            className="btn btn-edit"
                                            to={"/job/" + job.id}
                                        >
                                            edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(e) => ondelete(job)}
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
export default Employers;