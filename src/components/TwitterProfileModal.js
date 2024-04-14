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
                            className="absolute -top-4 -right-4 text-white hover:text-gray-600 focus:outline-none"
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
                className={`absolute top-52 cursor-pointer ${
                    isOpen ? "blur-sm" : ""
                }`}
                onClick={openModal}
            >
                <img
                    src={image}
                    alt="Profile Image"
                    className="w-52 h-auto mx-4 rounded-full"
                />
            </div>

            {isOpen && <ProfileImageModal src={image} onClose={closeModal} />}
        </div>
    );
};

export default TwitterProfileModal;
