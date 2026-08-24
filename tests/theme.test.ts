import { describe, expect, test } from "bun:test";
import { DEFAULT_THEME, nextTheme, type Theme } from "../src/hooks/useTheme";
import { farthestViewportDistance } from "../src/hooks/themeRipple";

describe("nextTheme", () => {
  test("walks lights-out → dim → light → lights-out", () => {
    const sequence: Theme[] = [DEFAULT_THEME];
    for (let i = 0; i < 3; i++) {
      sequence.push(nextTheme(sequence[sequence.length - 1]));
    }
    expect(sequence).toEqual(["lights-out", "dim", "light", "lights-out"]);
  });
});

describe("farthestViewportDistance", () => {
  const viewport = { width: 1000, height: 800 };

  test("from a top-right origin reaches the opposite corner", () => {
    expect(farthestViewportDistance({ x: 980, y: 20 }, viewport)).toBeCloseTo(
      Math.hypot(980, 780),
    );
  });

  test("from the center is half the diagonal", () => {
    expect(farthestViewportDistance({ x: 500, y: 400 }, viewport)).toBeCloseTo(
      Math.hypot(500, 400),
    );
  });

  test("from a corner equals the full diagonal", () => {
    expect(farthestViewportDistance({ x: 0, y: 0 }, viewport)).toBeCloseTo(
      Math.hypot(1000, 800),
    );
  });
});
