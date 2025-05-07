import React, { useState } from "react";

const Accordion = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const accordionData = [
        { title: "Section 1", content: "This is the content for section 1." },
        { title: "Section 2", content: "This is the content for section 2." },
        { title: "Section 3", content: "This is the content for section 3." }
    ];

    return (
        <div className="w-1/2 mx-auto mt-5">
            {accordionData.map((item, index) => (
                <div key={index} className="border-b">
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 focus:outline-none"
                    >
                        {item.title}
                    </button>
                    {openIndex === index && (
                        <div className="p-4 border-l-2 border-blue-500 bg-gray-100">
                            {item.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
