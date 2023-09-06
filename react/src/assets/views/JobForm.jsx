import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../context/ContextProvider";
const JobForm = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const [posts, setposts] = useState({
        id: null,
        title: "",
        image: null,
        description: "",
        meta_title: "",
        meta_description: "",
        meta_keyword: "",
        image_url: null,
        status: false,
        created_by: "",
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
                .get(`/posts/${id}`)
                .then(({ data }) => {
                    setposts(data.data);
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
            setposts({
                ...posts,
                image: file,
                image_url: reader.result,
            });
            ev.target.value = "";
        };

        reader.readAsDataURL(file);
    };

    const onsubmit = (e) => {
        e.preventDefault();
        // console.log(employees);
        const payload = { ...posts, description: descriptionRef.current.value };
        if (payload.image) {
            payload.image = payload.image_url;
        }
        delete payload.image_url;
        //let res = null;
        if (posts.id) {
            axiosClient
                .put(`/posts/${posts.id}`, payload)
                .then(() => {
                    navigate("/post");
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
                    navigate("/post");
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
            {!id ? <h3>add new post</h3> : <h3>update:{posts.title}</h3>}
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
                            placeholder="Post title"
                            value={posts.title}
                            onChange={(ev) =>
                                setposts({
                                    ...posts,
                                    title: ev.target.value,
                                })
                            }
                        />
                        <input
                            placeholder="slug"
                            value={posts.slug}
                            onChange={(ev) =>
                                setposts({
                                    ...posts,
                                    slug: ev.target.value,
                                })
                            }
                        />
                        <input
                            placeholder="meta title"
                            value={posts.meta_title}
                            onChange={(ev) =>
                                setposts({
                                    ...posts,
                                    meta_title: ev.target.value,
                                })
                            }
                        />
                        <input
                            placeholder="meta description"
                            value={posts.meta_description}
                            onChange={(ev) =>
                                setposts({
                                    ...posts,
                                    meta_description: ev.target.value,
                                })
                            }
                        />
                        <div className="img">
                            {posts.image_url && (
                                <img
                                    src={posts.image_url}
                                    style={{
                                        width: "35px",
                                        height: "35px",
                                        borderRadius: "50%",
                                    }}
                                    alt=""
                                />
                            )}
                            {!posts.image_url && (
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
                                placeholder="meta keword"
                                value={posts.meta_keyword}
                                onChange={(ev) =>
                                    setposts({
                                        ...posts,
                                        meta_keyword: ev.target.value,
                                    })
                                }
                            />
                        }
                        <input
                            type="checkbox"
                            checked={posts.status}
                            onChange={(ev) =>
                                setposts({
                                    ...posts,
                                    status: ev.target.checked,
                                })
                            }
                        />
                        status
                        <JoditEditor
                            value={`${posts.description}`}
                            ref={descriptionRef}
                            config={config}
                        />
                        <input
                            placeholder=" created by"
                            value={posts.created_by}
                            onChange={(ev) =>
                                setposts({
                                    ...posts,
                                    created_by: ev.target.value,
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