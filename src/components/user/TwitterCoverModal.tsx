import React, { useEffect, useRef, useState } from "react";

interface CoverImageModalProps {
  src: string;
  onClose: () => void;
  isClosing: boolean;
  isOpening: boolean;
}

const CoverImageModal: React.FC<CoverImageModalProps> = ({
  src,
  onClose,
  isClosing,
  isOpening,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cover-modal-title"
      className={`fixed z-[60] inset-0 flex items-center justify-center motion-safe:transition-opacity motion-safe:duration-300 ${
        isClosing || !isOpening ? "opacity-0" : "opacity-100"
      }`}
    >
      <h2 id="cover-modal-title" className="sr-only">
        Cover photo
      </h2>
      <div
        className={`fixed inset-0 bg-black motion-safe:transition-opacity motion-safe:duration-300 ${
          isClosing || !isOpening ? "opacity-0" : "opacity-80"
        }`}
        onClick={onClose}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className={`relative z-10 max-w-6xl w-full p-4 motion-safe:transition-all motion-safe:duration-300 ${
          isClosing
            ? "scale-95 opacity-0 translate-y-2"
            : isOpening
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-2"
        }`}
      >
        <img
          src={src}
          alt="Cover banner"
          className="mx-auto rounded-lg max-h-[80vh] max-w-full object-contain shadow-2xl"
          loading="lazy"
        />
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
    requestAnimationFrame(() => setIsOpening(true));
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
    <>
      <button
        type="button"
        onClick={openModal}
        aria-label="Open cover photo"
        className="block w-full aspect-[3/1] overflow-hidden focus:outline-none"
      >
        <img
          src={image}
          alt="Cover banner"
          className="w-full h-full object-cover"
        />
      </button>
      {isOpen && (
        <CoverImageModal
          src={image}
          onClose={closeModal}
          isClosing={isClosing}
          isOpening={isOpening}
        />
      )}
    </>
  );
};

export default TwitterCoverModal;
