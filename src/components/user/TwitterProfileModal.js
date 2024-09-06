import React, { useEffect, useRef, useState } from "react";

const ProfileImageModal = ({ src, onClose }) => {
    const profileModalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileModalRef.current && !profileModalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="fixed z-50 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <div className="bg-black bg-opacity-75 fixed inset-0 w-full h-full z-40"></div>
                <div className="relative z-50 w-full max-w-lg mx-auto p-4">
                    <div className="bg-white rounded-full shadow-lg" ref={profileModalRef}>
                        <img
                            src={src}
                            alt="Profile not found"
                            className="w-full rounded-full"
                        />
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
                            alt="Profile not found"
                            className="rounded-full md:w-40 sm:w-36 w-32 cursor-pointer"
                        />
                    </div>
                </div>
            </div>

            {isOpen && <ProfileImageModal src={image} onClose={closeModal} />}
        </div>
    );
};

export default TwitterProfileModal;
