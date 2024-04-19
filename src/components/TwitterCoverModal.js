import React, { useState } from "react";
import { CrossIcon } from "./utils/Icons";

const CoverImageModal = ({ src, onClose }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto w-screen">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-black bg-opacity-75 fixed inset-0 w-screen h-full z-40"></div>
                <div className="relative z-50 w-screen mx-auto p-4">
                    <div className="bg-black rounded-lg shadow-lg">
                        <img
                            src={src}
                            alt="Modal Image"
                            className="w-screen rounded-lg"
                        />
                        <button
                            className="absolute -top-4 right-4 text-white hover:text-gray-300 focus:outline-none"
                            onClick={onClose}
                        >
                            <CrossIcon />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const TwitterCoverModal = ({ image }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div
                className={`relative cursor-pointer ${isOpen ? "blur-sm" : ""}`}
                onClick={openModal}
            >
                <img
                    src={image}
                    alt="Cover Image"
                    className="w-screen md:h-auto object-cover"
                />
            </div>

            {isOpen && <CoverImageModal src={image} onClose={closeModal} />}
        </div>
    );
};

export default TwitterCoverModal;
