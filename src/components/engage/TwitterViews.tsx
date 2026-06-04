const ViewsButton = () => {
  return (
    <span
      className="group/share p-2 -m-2 rounded-full text-x-text-secondary cursor-pointer hover:bg-x-accent/10 transition-colors"
      role="button"
      aria-label="Views"
    >
      <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-x-text-secondary group-hover/share:fill-x-accent transition-colors" aria-hidden="true">
        <path d="M8.75 21V3h2v18h-2zM18.75 21V8.5h2V21h-2zM13.75 21v-9h2v9h-2zM3.75 21v-4h2v4h-2z" />
      </svg>
    </span>
  );
};

export default ViewsButton;
