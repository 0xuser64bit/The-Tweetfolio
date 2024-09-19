import React, { useState, useRef, useEffect } from "react";

const CoverImageModal = ({ src, onClose }) => {
  const coverModalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        coverModalRef.current &&
        !coverModalRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed z-[9999] inset-0 overflow-y-auto w-screen">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-black bg-opacity-75 fixed inset-0 w-screen h-full z-40"></div>
        <div className="relative z-50 w-screen mx-auto p-4">
          <div ref={coverModalRef}>
            <img
              src={src}
              alt="Modal not found"
              className="mx-auto rounded-lg h-80 object-cover"
            />
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
        className={`relative cursor-pointer lg:h-96 md:h-80 md:overflow-hidden ${isOpen ? "blur-sm" : ""}`}
        onClick={openModal}
      >
        <img
          src={image}
          alt="Cover Not found"
          className="w-screen md:h-auto object-cover"
        />
      </div>

      {isOpen && <CoverImageModal src={image} onClose={closeModal} />}
    </div>
  );
};

export default TwitterCoverModal;
