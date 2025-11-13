import React, { useState, useRef, useEffect } from "react";

interface CoverImageModalProps {
  src: string;
  onClose: () => void;
  isClosing: boolean;
  isOpening: boolean;
}

const CoverImageModal: React.FC<CoverImageModalProps> = ({ src, onClose, isClosing, isOpening }) => {
  const coverModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        coverModalRef.current &&
        !coverModalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
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
        className={`relative z-50 max-w-6xl mx-auto p-4 w-full transition-all duration-300 ease-in-out transform ${isClosing ? 'scale-95 opacity-0 translate-y-4' : isOpening ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
          }`}
      >
        <div ref={coverModalRef}>
          <img
            src={src}
            alt="Cover"
            className={`mx-auto rounded-lg max-h-[80vh] max-w-full object-contain shadow-2xl transition-all duration-300 ease-in-out transform ${isClosing ? 'scale-90' : isOpening ? 'scale-100' : 'scale-90'
              }`}
            style={{ minHeight: '300px' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

interface TwitterCoverModalProps {
  image: string;
}

const TwitterCoverModal: React.FC<TwitterCoverModalProps> = ({ image }) => {
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
      <div
        className="relative cursor-pointer lg:h-96 md:h-80 md:overflow-hidden"
        onClick={openModal}
      >
        <img
          src={image}
          alt="Cover"
          className="w-screen md:h-auto object-cover"
        />
      </div>

      {isOpen && <CoverImageModal src={image} onClose={closeModal} isClosing={isClosing} isOpening={isOpening} />}
    </div>
  );
};

export default TwitterCoverModal;
