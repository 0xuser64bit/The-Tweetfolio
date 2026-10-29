import React, { useCallback, useState } from "react";
import ImageDialog from "./ImageDialog";

const TwitterCoverModal = ({ image }: { image: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open cover photo"
        className="block w-full aspect-[3/1] overflow-hidden"
      >
        <img
          src={image}
          alt="Cover banner"
          className="w-full h-full object-cover"
        />
      </button>
      {isOpen && (
        <ImageDialog src={image} alt="Cover photo" onClose={closeModal} />
      )}
    </>
  );
};

export default TwitterCoverModal;
