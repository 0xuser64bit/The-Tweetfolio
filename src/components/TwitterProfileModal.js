import React, { useState } from "react";
import { CrossIcon } from "./utils/Icons";

const ProfileImageModal = ({ src, onClose }) => {
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-black bg-opacity-75 fixed inset-0 w-full h-full z-40"></div>
                <div className="relative z-50 w-full max-w-lg mx-auto p-4">
                    <div className="bg-white rounded-full shadow-lg">
                        <img
                            src={src}
                            alt="Profile Image"
                            className="w-full rounded-full"
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
            <div className="flex justify-between">
                <div className="ms-5 relative w-full">
                    <div
                        className="absolute sm:-top-24 -top-20 border-4 rounded-full border-black overflow-hidden"
                        onClick={openModal}
                    >
                        <img
                            src={image}
                            alt="Profile Image"
                            className="rounded-full md:w-40 sm:w-36 w-32"
                        />
                    </div>
                </div>
            </div>

            {isOpen && <ProfileImageModal src={image} onClose={closeModal} />}
        </div>
    );
};

export default TwitterProfileModal;
