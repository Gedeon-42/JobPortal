import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../context/ContextProvider";
const JobForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [jobs, setjobs] = useState({
        id: null,
        title: "",
        logo: null,
        description: "",
        location: "",
        company: "",
        website: "",
        image_url: null,
        tags: false,
        email: "",
    });
    const descriptionRef = useRef();
    const config = {
        placeholder: "start type",
    };
    const { id } = useParams();
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/jobss/${id}`)
                .then(({ data }) => {
                    setjobs(data.data);
                    setLoading(false);
                })
                .catch(() => {
                    setLoading(true);
                });
        }, []);
    }

    const onImagechoose = (ev) => {
        //console.log("image choosen");
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setjobs({
                ...jobs,
                logo: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };

        reader.readAsDataURL(file);
    };

    const onsubmit = (e) => {
        e.preventDefault();
        // console.log(employees);
        const payload = { ...jobs, description: descriptionRef.current.value };
        if (payload.logo) {
            payload.logo = payload.image_url;
        }
        delete payload.image_url;
        //let res = null;
        if (jobs.id) {
            axiosClient
                .put(`/jobs/${jobs.id}`, payload)
                .then(() => {
                    navigate("/jobs");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post("/jobs", payload)
                .then(() => {
                    // set notification
                    //setNotification("user created successfully");
                    // redirect user
                    navigate("/jobs");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };
    return (
        <div>
            {!id ? <h3>add new post</h3> : <h3>update:{jobs.title}</h3>}
            <div className="card animated fadeInDown ">
                {loading && <p>loading...</p>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form method="POST" onSubmit={onsubmit}>
                        <input
                            placeholder="job title"
                            value={jobs.title}
                            onChange={(ev) =>
                                setjobs({
                                    ...jobs,
                                    title: ev.target.value,
                                })
                            }
                        />
                
                        <input
                            placeholder="comapny"
                            value={jobs.company}
                            onChange={(ev) =>
                                setjobs({
                                    ...jobs,
                                    company: ev.target.value,
                                })
                            }
                        />
                        <input
                            placeholder="location"
                            value={jobs.location}
                            onChange={(ev) =>
                                setjobs({
                                    ...jobs,
                                    location: ev.target.value,
                                })
                            }
                        />
                        <div className="img">
                            {jobs.image_url && (
                                <img
                                    src={jobs.image_url}
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        borderRadius: "50%",
                                    }}
                                    alt=""
                                />
                            )}
                            {!jobs.image_url && (
                                <img
                                    src=''
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        borderRadius: "50%",
                                    }}
                                />
                            )}
                            <input
                                type="file"
                                onChange={onImagechoose}
                                className="img_choosee"
                            />{" "}
                            choose image
                        </div>
                        {
                            <input
                                placeholder="email"
                                value={jobs.email}
                                onChange={(ev) =>
                                    setjobs({
                                        ...jobs,
                                        email: ev.target.value,
                                    })
                                }
                            />
                        }
                    
                        <JoditEditor
                            value={`${jobs.description}`}
                            ref={descriptionRef}
                            config={config}
                        />
                        <input
                            placeholder=" tags"
                            value={jobs.tags}
                            onChange={(ev) =>
                                setjobs({
                                    ...jobs,
                                    tags: ev.target.value,
                                })
                            }
                        />
                          <input
                            placeholder=" website"
                            value={jobs.website}
                            onChange={(ev) =>
                                setjobs({
                                    ...jobs,
                                    website: ev.target.value,
                                })
                            }
                        />
                        <button className="btn btn-edit"> save</button>
                    </form>
                )}
            </div>
        </div>
    );
};
export default JobForm;