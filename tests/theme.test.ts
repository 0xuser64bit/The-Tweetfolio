import { describe, expect, test } from "bun:test";
import { DEFAULT_THEME, nextTheme, type Theme } from "../src/hooks/useTheme";
import { farthestViewportDistance, toPageOrigin } from "../src/hooks/themeRipple";

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

describe("toPageOrigin", () => {
  test("adds the scroll offset so the wave starts at the button", () => {
    expect(toPageOrigin({ x: 980, y: 20 }, { x: 0, y: 1200 })).toEqual({
      x: 980,
      y: 1220,
    });
  });

  test("is identity at the top of the page", () => {
    expect(toPageOrigin({ x: 100, y: 50 }, { x: 0, y: 0 })).toEqual({
      x: 100,
      y: 50,
    });
  });
});
