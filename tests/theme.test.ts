import { describe, expect, test } from "bun:test";
import { DEFAULT_THEME, nextTheme, type Theme } from "../src/hooks/useTheme";

describe("nextTheme", () => {
  test("walks lights-out → dim → light → lights-out", () => {
    const sequence: Theme[] = [DEFAULT_THEME];
    for (let i = 0; i < 3; i++) {
      sequence.push(nextTheme(sequence[sequence.length - 1]));
    }
    expect(sequence).toEqual(["lights-out", "dim", "light", "lights-out"]);
  });
});
