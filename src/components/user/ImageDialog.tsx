import React, { useEffect, useRef } from "react";

interface Props {
  src: string;
  alt: string;
  onClose: () => void;
}

const ImageDialog = ({ src, alt, onClose }: Props) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={alt}
      aria-modal="true"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/85"
    >
      <div className="flex h-full w-full items-center justify-center pointer-events-none">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo"
          className="pointer-events-auto fixed right-4 top-4 z-10 rounded-full bg-black/70 px-4 py-2 text-[15px] font-bold text-white hover:bg-black"
        >
          Close ×
        </button>
        <img
          src={src}
          alt={alt}
          className="pointer-events-auto max-h-[85dvh] max-w-full rounded-lg object-contain shadow-2xl"
        />
      </div>
    </dialog>
  );
};

export default ImageDialog;
