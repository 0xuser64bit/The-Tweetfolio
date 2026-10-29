import React, { useCallback, useState } from "react";
import { DISPLAYNAME } from "../../config";
import ImageDialog from "./ImageDialog";

const TwitterProfileModal = ({ image }: { image: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open profile photo"
        className="relative z-10 -mt-12 md:-mt-16.5 block w-24 h-24 md:w-33.25 md:h-33.25 rounded-[6px] md:rounded-[7px] p-[3px] md:p-[4px] bg-linear-to-br from-x-gold-light via-x-gold to-x-gold-dark shadow-[0_0_18px_rgba(205,129,5,0.4)]"
      >
        <span className="block w-full h-full rounded-[3px] md:rounded-[4px] overflow-hidden bg-x-primary">
          <img
            src={image}
            alt={`${DISPLAYNAME}'s profile`}
            className="w-full h-full object-cover"
            width={640}
            height={640}
          />
        </span>
      </button>
      {isOpen && (
        <ImageDialog
          src={image}
          alt={`${DISPLAYNAME}'s profile photo`}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default TwitterProfileModal;
