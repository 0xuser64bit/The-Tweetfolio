import { describe, expect, test } from "bun:test";
import { copyLink } from "../src/hooks/useCopyLink";

describe("copying a post link", () => {
  test("copies the exact URL including its post fragment", async () => {
    const copied: string[] = [];
    const clipboard = {
      writeText: async (url: string) => {
        copied.push(url);
      },
    };
    const url = "https://user64bit.world/proof-of-work#project-pawket";
    expect(await copyLink(url, clipboard)).toBe(true);
    expect(copied).toEqual([url]);
  });

  test("handles permission denial without an unhandled rejection", async () => {
    const clipboard = {
      writeText: async () => {
        throw new Error("Permission denied");
      },
    };
    expect(await copyLink("https://user64bit.world", clipboard)).toBe(false);
  });

  test("handles environments without clipboard support", async () => {
    expect(await copyLink("https://user64bit.world", null)).toBe(false);
  });
});
