import React, { useEffect, useRef, useState } from "react";

const ProfileImageModal = ({ src, onClose, isClosing, isOpening }) => {
  const profileModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  return (
    <div
      className={`fixed z-[9999] inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${isClosing || !isOpening ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ease-in-out ${isClosing || !isOpening ? 'opacity-0' : 'opacity-80'
          }`}
        onClick={onClose}
      />

      <div
        className={`relative z-50 w-full max-w-lg mx-auto p-4 transition-all duration-300 ease-in-out transform ${isClosing ? 'scale-90 opacity-0 translate-y-4' : isOpening ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'
          }`}
      >
        <div
          className={`bg-white rounded-full shadow-2xl p-2 transition-all duration-300 ease-in-out transform ${isClosing ? 'scale-85' : isOpening ? 'scale-100' : 'scale-85'
            }`}
          ref={profileModalRef}
        >
          <img
            src={src}
            alt="Profile Image"
            className="w-full rounded-full"
            style={{ minWidth: '300px', maxWidth: '500px' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

const TwitterProfileModal = ({ image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsClosing(false);
    setTimeout(() => {
      setIsOpening(true);
    }, 10);
  };

  const closeModal = () => {
    setIsClosing(true);
    setIsOpening(false);
    // Wait for animation to complete before removing modal
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="ms-5 relative w-full">
          <div
            className="absolute sm:-top-24 -top-20 border-4 rounded-full border-black overflow-hidden cursor-pointer"
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

      {isOpen && <ProfileImageModal src={image} onClose={closeModal} isClosing={isClosing} isOpening={isOpening} />}
    </div>
  );
};

export default TwitterProfileModal;
