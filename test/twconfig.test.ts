import { assert } from "chai";
import { describe, it } from "node:test";
import { Config } from "tailwindcss";
import { TWConfig } from "../src/twconfig";

import localConfig from "./tailwind.config";

const customConfig = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      special: "#421",
      white: "#FFF",
      gris: {
        "1": "#111",
        "2": "#222",
        "3": "#333",
        "4": "#444",
        "5": "#555",
        "6": "#666",
        "7": "#777",
        "8": "#888",
        "9": "#999",
        "A": "#AAA",
        "B": "#BBB",
        "C": "#CCC",
        "D": "#DDD",
        "E": "#EEE",
        DEFAULT: "#888",
      },
      black: "#000",
    },
    extend: {},
  },
  plugins: [],
} satisfies Config;

describe("class TWConfig", () => {
  const twcLocal = new TWConfig(localConfig);
  const twcCustom = new TWConfig(customConfig);
  it("Provides the color method", () => {
    assert.equal(typeof twcLocal.color, "function");
    assert.equal(typeof twcCustom.color, "function");
  });

  it("Gets the expected colors", () => {
    assert.equal(twcLocal.color("white"), "#fff");
    assert.equal(twcLocal.color("black"), "#000");
    assert(twcLocal.color("slate-600")!.startsWith("#"));
    assert.strictEqual(twcLocal.color("special"), undefined);
    assert.isString(twcLocal.color("slate-100"));
    assert.isString(twcLocal.color("pink-900"));

    assert.equal(twcCustom.color("white"), "#FFF");
    assert.equal(twcCustom.color("black"), "#000");
    assert.equal(twcCustom.color("special"), "#421");
    assert.equal(twcCustom.color("gris-3"), "#333");
    assert.equal(twcCustom.color("gris-C"), "#CCC");
    assert.equal(twcCustom.color("gris-c"), undefined);
    assert.equal(twcCustom.color("gris"), "#888");
    
    assert.isUndefined(twcCustom.color("slate-100"));
    assert.isUndefined(twcCustom.color("pink-900"));
  });
});
