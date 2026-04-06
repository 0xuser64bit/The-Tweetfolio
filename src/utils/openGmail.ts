/**
 * Opens Gmail compose directly in a new tab.
 * Works universally — no mail client configuration needed.
 */
export const openGmailCompose = (to: string) => {
  const subject = encodeURIComponent("Let's work together!");
  const body = encodeURIComponent(
    "Hi Arth,\n\nI came across your portfolio and would love to connect.\n\n[Your message here]"
  );
  window.open(
    `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
    "_blank",
    "noopener,noreferrer"
  );
};
