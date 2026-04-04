import React, { useEffect, useRef, useState } from "react";

interface ProfileImageModalProps {
  src: string;
  onClose: () => void;
  isClosing: boolean;
  isOpening: boolean;
}

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({ src, onClose, isClosing, isOpening }) => {
  const profileModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target as Node)
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
        className={`fixed inset-0 bg-x-primary transition-opacity duration-300 ease-in-out ${isClosing || !isOpening ? 'opacity-0' : 'opacity-80'
          }`}
        onClick={onClose}
      />

      <div
        className={`relative z-50 w-full max-w-lg mx-auto p-4 transition-all duration-300 ease-in-out transform ${isClosing ? 'scale-90 opacity-0 translate-y-4' : isOpening ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4'
          }`}
      >
        <div
          className={`bg-x-text-primary rounded-full shadow-2xl p-2 transition-all duration-300 ease-in-out transform ${isClosing ? 'scale-85' : isOpening ? 'scale-100' : 'scale-85'
            }`}
          ref={profileModalRef}
        >
          <img
            src={src}
            alt="Profile"
            className="w-full rounded-full"
            style={{ minWidth: '300px', maxWidth: '500px' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

interface TwitterProfileModalProps {
  image: string;
}

const TwitterProfileModal: React.FC<TwitterProfileModalProps> = ({ image }) => {
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
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  return (
    <div>
      <div
        className="-mt-[68px] md:-mt-[80px] border-[4px] border-x-primary rounded-full overflow-hidden cursor-pointer w-[120px] h-[120px] md:w-[133px] md:h-[133px]"
        onClick={openModal}
      >
        <img
          src={image}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {isOpen && <ProfileImageModal src={image} onClose={closeModal} isClosing={isClosing} isOpening={isOpening} />}
    </div>
  );
};

export default TwitterProfileModal;
