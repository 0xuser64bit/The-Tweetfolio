import { useEffect, useRef, useState } from "react";

export const copyLink = async (
  url: string,
  clipboard: Pick<Clipboard, "writeText"> | null | undefined = globalThis
    .navigator?.clipboard,
): Promise<boolean> => {
  try {
    if (!clipboard) return false;
    await clipboard.writeText(url);
    return true;
  } catch {
    return false;
  }
};

const useCopyLink = (targetId?: string) => {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const [url, setUrl] = useState("");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mounted = useRef(false);
  const attempt = useRef(0);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copy = async () => {
    const currentAttempt = ++attempt.current;
    if (resetTimer.current) clearTimeout(resetTimer.current);
    const link = new URL(window.location.href);
    if (targetId) link.hash = targetId;
    setUrl(link.href);
    const copied = await copyLink(link.href);
    if (!mounted.current || attempt.current !== currentAttempt) return;
    setStatus(copied ? "copied" : "error");
    if (copied) {
      resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
    }
  };

  return { status, url, copy };
};

export default useCopyLink;
