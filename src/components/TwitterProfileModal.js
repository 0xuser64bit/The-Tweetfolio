import React, { useState } from "react";
import { CrossIcon } from "./utils/Icons";

const ProfileImageModal = ({ src, onClose }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-black bg-opacity-75 fixed inset-0 w-full h-full z-40"></div>
                <div className="relative z-50 w-full max-w-lg mx-auto p-4">
                    <div className="bg-white rounded-lg shadow-lg">
                        <img
                            src={src}
                            alt="Profile Image"
                            className="w-full h-auto rounded-t-lg"
                        />
                        <button
                            className="absolute -top-2 right-0 text-white hover:text-gray-600 focus:outline-none"
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

const TwitterProfileModal = ({ image }) => {
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
                className={`absolute md:top-52 top-28 cursor-pointer ${
                    isOpen ? "blur-sm" : ""
                }`}
                onClick={openModal}
            >
                <img
                    src={image}
                    alt="Profile Image"
                    className="rounded-full w-32 h-32 border-4 border-white md:w-40 md:h-40"
                />
            </div>

            {isOpen && <ProfileImageModal src={image} onClose={closeModal} />}
        </div>
    );
};

export default TwitterProfileModal;
