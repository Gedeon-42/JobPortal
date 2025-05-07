import React, { useState } from "react";

import axios from "axios";
// import { RiDice6Line  } from 'react-icons/ri'

const AddCourse = () => {
    const [course, setCourse] = useState({
        title: "",

        
        // image: null,
        video_intro: "",
        description: "",
        program_belonged: "",
        categories: "",
        topics: [
            {
                name: "",
                lesson: [{ title: "", video: "", content: "" }],
                quizzes: [
                    {
                        name: "",
                        questions: [
                            {
                                type: "multiple_choice", // default
                                question: "",
                                correct_answer: "",
                                options: ["", ""], // For multiple choice
                            },
                        ],
                    },
                ],
            },
        ],
    });

    const [openIndex, setOpenIndex] = useState(null);
    const [image, setImage] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const [activeTab, setActiveTab] = useState("tab1");
    const [showQuestion, SetShowQuestion] = useState(false);
    const handleQuestion = () => {
        SetShowQuestion(!false);
    };

    // Handle Course Input Change
    const handleCourseChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };

    // Handle Topic Input Change
    const handleTopicChange = (index, e) => {
        const newTopics = [...course.topics];
        newTopics[index][e.target.name] = e.target.value;
        setCourse({ ...course, topics: newTopics });
    };

    const addTopic = () => {
        const newTopicIndex = course.topics.length; // Get the new topic's index
        setCourse({
            ...course,
            topics: [
                ...course.topics,
                {
                    name: "",
                    lessons: [{ title: "", video: "", content: "" }],
                    quizzes: [
                        {
                            name: "",
                            questions: [
                                {
                                    type: "multiple_choice",
                                    question: "",
                                    correct_answer: "",
                                    options: ["", ""],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        // Toggle the accordion for the newly added topic
        toggleAccordion(newTopicIndex);
    };

    // Add Lessons
    const addLessons = (topicIndex) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].lessons.push({
            title: "",
            video: "",
            content: "",
            featured_image: "",
        });
        setCourse({ ...course, topics: newTopics });
    };
    //   // Handle Topic Input Change
    //   const handleLessonChange = (index, e) => {
    //     const newTopics = [...course.topics];
    //     newTopics[index][e.target.name] = e.target.value;
    //     setCourse({ ...course, topics: newTopics });
    // };
    // Update lesson fields
    const handleLessonChange = (topicIndex, lessonIndex, field, value) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].lesson[lessonIndex][field] = value;
        setCourse({ ...course, topics: newTopics });
    };

    // Add a Quiz to a Topic
    const addQuiz = (topicIndex) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].quizzes.push({
            name: "",
            questions: [
                {
                    type: "multiple_choice",
                    question: "",
                    correct_answer: "",
                    options: ["", ""],
                },
            ],
        });
        setCourse({ ...course, topics: newTopics });
    };

    // Add a Question to a Quiz
    const addQuestion = (topicIndex, quizIndex) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].quizzes[quizIndex].questions.push({
            type: "multiple_choice",
            question: "",
            correct_answer: "",
            options: ["", ""],
        });
        setCourse({ ...course, topics: newTopics });
    };

    // Handle Question Type Change
    const handleQuestionTypeChange = (
        topicIndex,
        quizIndex,
        questionIndex,
        e
    ) => {
        const newTopics = [...course.topics];
        const selectedType = e.target.value;

        // Update question type and reset options accordingly
        const question = {
            type: selectedType,
            question: "",
            correct_answer: "",
            options: selectedType === "multiple_choice" ? ["", ""] : [], // Reset options for multiple choice
        };

        newTopics[topicIndex].quizzes[quizIndex].questions[questionIndex] =
            question;
        setCourse({ ...course, topics: newTopics });
    };

    // Handle Question Input Change
    const handleQuestionChange = (topicIndex, quizIndex, questionIndex, e) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].quizzes[quizIndex].questions[questionIndex][
            e.target.name
        ] = e.target.value;
        setCourse({ ...course, topics: newTopics });
    };

    // Add Option to Multiple Choice Question
    const addOption = (topicIndex, quizIndex, questionIndex) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].quizzes[quizIndex].questions[
            questionIndex
        ].options.push("");
        setCourse({ ...course, topics: newTopics });
    };

    // Handle Option Change for Multiple Choice
    const handleOptionChange = (
        topicIndex,
        quizIndex,
        questionIndex,
        optionIndex,
        e
    ) => {
        const newTopics = [...course.topics];
        newTopics[topicIndex].quizzes[quizIndex].questions[
            questionIndex
        ].options[optionIndex] = e.target.value;
        setCourse({ ...course, topics: newTopics });
    };

    const handleLogoChange = (e) => {
        setImage(e.target.files[0]);
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", course.title);
        formData.append("description", course.description);
        formData.append("program_belonged", course.program_belonged);
        formData.append("categories", course.categories);
        formData.append("video_intro", course.video_intro);
        if (image) formData.append("image", image);

        // append topics
        course.topics.forEach((topic, topicIndex) => {
            formData.append(`topics[${topicIndex}][name]`, topic.name);

            topic.lesson.forEach((less, lessonIndex) => {
                formData.append(
                    `topics[${topicIndex}][lesson][${lessonIndex}][title]`,
                    less.title
                ),
                    formData.append(
                        `topics[${topicIndex}][lesson][${lessonIndex}][content]`,
                        less.content
                    );
            });
        });
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/course",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            alert("Course Added Successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error adding course:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-course-form">
            <div className="add-cours2-header">
                <div className="tabs-container">
                    <button type="button" onClick={() => setActiveTab("tab1")}>
                        {" "}
                        1 basics
                    </button>
                    <button type="button" onClick={() => setActiveTab("tab2")}>
                        {" "}
                        2 curriculmn
                    </button>
                </div>
                <div className="publish-container">
                    <button type="button" className="button-draft">
                        save as draft
                    </button>
                    <button className="btn-publish">publish</button>
                </div>
            </div>
            {activeTab === "tab1" && (
                <div className="addcourse2-wrapper">
                    <div className="addcourse-content1">
                        <label>Course Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={course.title}
                            onChange={handleCourseChange}
                            placeholder="Enter course title"
                            required
                        />

                        <label htmlFor="">Description</label>
                        <textarea
                            name="description"
                            value={course.description}
                            onChange={handleCourseChange}
                            id=""
                            placeholder="description"
                        ></textarea>
                        <div className="option-wrapper">
                            <div className="option-content1">
                                <h6>General</h6>
                            </div>
                            <div className="option-content2">
                                <label htmlFor="">maximum student</label>
                                <input type="number" placeholder="0" />
                                <label htmlFor="">difficult level</label>
                                <select name="" id="">
                                    <option value="">beginner</option>
                                    <option value="">intermediate</option>
                                    <option value="">advanced</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="addcourse-content2">
                        <label htmlFor="">Featured Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleLogoChange}
                            accept="image/*"
                        />
                        <label htmlFor="">Featured video</label>
                        <input type="file" placeholder="" />
                        <div className="add-url">
                            <button>Add From Url</button>
                        </div>
                        <label htmlFor="">category</label>
                        <select
                            name="categories"
                            onChange={handleCourseChange}
                            id=""
                        >
                            <option value="">self paced</option>
                            <option value="">freemium</option>
                        </select>
                        <label htmlFor="">Program Belonged</label>
                        <select
                            name="progran_belonged"
                            onChange={handleCourseChange}
                            id=""
                        >
                            <option value="cyber security">
                                Cyber Security
                            </option>
                            <option value="Data Science">Data Science</option>
                        </select>
                    </div>
                </div>
            )}
            {activeTab === "tab2" && (
                <div className="curriculum-wrapper">
                    <div className="curriculum-intro">
                        <h3>Topics</h3>
                        <div>
                            {course.topics.map((topic, topicIndex) => (
                                <div key={topicIndex} className="topic-wrapper">
                                    {openIndex === topicIndex ? (
                                        <>
                                            {" "}
                                            <div className="topic-input-container">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="topic-input"
                                                    placeholder="Enter Topic name"
                                                    value={topic.name}
                                                    onChange={(e) =>
                                                        handleTopicChange(
                                                            topicIndex,
                                                            e
                                                        )
                                                    }
                                                    required
                                                />
                                                <button
                                                    className="btn-ok-topic"
                                                    onClick={toggleAccordion}
                                                >
                                                    {" "}
                                                    ok
                                                </button>
                                            </div>
                                            {openIndex === topicIndex && (
                                                <div className="accordion-content">
                                                    <div className="quiz-input">
                                                        {topic.quizzes.map(
                                                            (
                                                                quiz,
                                                                quizIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        quizIndex
                                                                    }
                                                                >
                                                                    <label>
                                                                        Quiz
                                                                        Name:
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="name"
                                                                        value={
                                                                            quiz.name
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleQuestionChange(
                                                                                topicIndex,
                                                                                quizIndex,
                                                                                e
                                                                            )
                                                                        }
                                                                    />

                                                                    <h5>
                                                                        Questions
                                                                    </h5>
                                                                    {quiz.questions.map(
                                                                        (
                                                                            question,
                                                                            questionIndex
                                                                        ) => (
                                                                            <div
                                                                                key={
                                                                                    questionIndex
                                                                                }
                                                                            >
                                                                                <label>
                                                                                    Question:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="question"
                                                                                    value={
                                                                                        question.question
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleQuestionChange(
                                                                                            topicIndex,
                                                                                            quizIndex,
                                                                                            questionIndex,
                                                                                            e
                                                                                        )
                                                                                    }
                                                                                />

                                                                                <label>
                                                                                    Question
                                                                                    Type:
                                                                                </label>
                                                                                <select
                                                                                    value={
                                                                                        question.type
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleQuestionTypeChange(
                                                                                            topicIndex,
                                                                                            quizIndex,
                                                                                            questionIndex,
                                                                                            e
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <option value="multiple_choice">
                                                                                        Multiple
                                                                                        Choice
                                                                                    </option>
                                                                                    <option value="true_false">
                                                                                        True/False
                                                                                    </option>
                                                                                    <option value="essay">
                                                                                        Essay
                                                                                    </option>
                                                                                </select>

                                                                                {question.type ===
                                                                                    "multiple_choice" && (
                                                                                    <div>
                                                                                        <label>
                                                                                            Options:
                                                                                        </label>
                                                                                        {question.options.map(
                                                                                            (
                                                                                                option,
                                                                                                optionIndex
                                                                                            ) => (
                                                                                                <input
                                                                                                    key={
                                                                                                        optionIndex
                                                                                                    }
                                                                                                    type="text"
                                                                                                    value={
                                                                                                        option
                                                                                                    }
                                                                                                    onChange={(
                                                                                                        e
                                                                                                    ) =>
                                                                                                        handleOptionChange(
                                                                                                            topicIndex,
                                                                                                            quizIndex,
                                                                                                            questionIndex,
                                                                                                            optionIndex,
                                                                                                            e
                                                                                                        )
                                                                                                    }
                                                                                                />
                                                                                            )
                                                                                        )}
                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                addOption(
                                                                                                    topicIndex,
                                                                                                    quizIndex,
                                                                                                    questionIndex
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            +
                                                                                            Add
                                                                                            Option
                                                                                        </button>
                                                                                    </div>
                                                                                )}

                                                                                <label>
                                                                                    Correct
                                                                                    Answer:
                                                                                </label>
                                                                                <input
                                                                                    type="text"
                                                                                    name="correct_answer"
                                                                                    value={
                                                                                        question.correct_answer
                                                                                    }
                                                                                    onChange={(
                                                                                        e
                                                                                    ) =>
                                                                                        handleQuestionChange(
                                                                                            topicIndex,
                                                                                            quizIndex,
                                                                                            questionIndex,
                                                                                            e
                                                                                        )
                                                                                    }
                                                                                />
                                                                            </div>
                                                                        )
                                                                    )}
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            addQuestion(
                                                                                topicIndex,
                                                                                quizIndex
                                                                            )
                                                                        }
                                                                    >
                                                                        + Add
                                                                        Question
                                                                    </button>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    <div className="lesson-container">
                                                        {/* Lessons Section */}
                                                        <h4>Lessons</h4>
                                                        {topic.lesson.map(
                                                            (
                                                                less,
                                                                lessonIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        lessonIndex
                                                                    }
                                                                    style={{
                                                                        paddingLeft:
                                                                            "20px",
                                                                        marginBottom:
                                                                            "5px",
                                                                    }}
                                                                >
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Lesson Title"
                                                                        value={
                                                                            less.title
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleLessonChange(
                                                                                topicIndex,
                                                                                lessonIndex,
                                                                                "title",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Video URL"
                                                                        value={
                                                                            less.video
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleLessonChange(
                                                                                topicIndex,
                                                                                lessonIndex,
                                                                                "video",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Lesson Content"
                                                                        value={
                                                                            less.content
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleLessonChange(
                                                                                topicIndex,
                                                                                lessonIndex,
                                                                                "content",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Lesson Image URL"
                                                                        value={
                                                                            less.featured_image
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleLessonChange(
                                                                                topicIndex,
                                                                                lessonIndex,
                                                                                "featured_image",
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )}
                                                    </div>

                                                    <div className="flex-quiz-lesson">
                                                        <button
                                                            onClick={() =>
                                                                addLessons(
                                                                    topicIndex
                                                                )
                                                            }
                                                            type="button"
                                                        >
                                                            + Lesson{" "}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                addQuiz(
                                                                    topicIndex
                                                                )
                                                            }
                                                        >
                                                            + Add Quiz
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <span
                                            onClick={() =>
                                                setOpenIndex(topicIndex)
                                            }
                                        >
                                            {topic.name}
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            toggleAccordion(topicIndex)
                                        }
                                        className="btn-show-detail"
                                    >
                                        {openIndex === topicIndex
                                            ? "Hide"
                                            : "Show"}{" "}
                                        Details
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            className="btn-add-topic"
                            onClick={addTopic}
                        >
                            + Add Topic
                        </button>
                        <button type="submit">Submit Course</button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default AddCourse;
