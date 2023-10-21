import { unescape } from "node:querystring";
import resolveConfig from "tailwindcss/resolveConfig";

export class TWConfig {
  readonly _config: any;
  readonly _colors: any;

  constructor(localConfig: any) {
    this._config = resolveConfig(localConfig);
    this._colors = this._config.theme.colors;
  }

  color(name: string): string | undefined {
    const colors = this._config.theme.colors;

    // direct definition or default in nested

    if (name in this._colors) {
      const c = this._colors[name];
      if (typeof c == "string") {
        return c;
      }
      if (typeof c == "object" && "DEFAULT" in c) {
        const dc = c["DEFAULT"];
        return typeof dc == "string" ? dc : undefined;
      }
      return undefined;
    }

    // nested definition

    const dashIndex = name.indexOf("-");
    if (dashIndex < 0) {
      return undefined;
    }
    const shadeName = name.slice(0, dashIndex);
    const shadeVariant = name.slice(dashIndex + 1);

    if (!(shadeName in this._colors)) {
      return undefined;
    }

    const shadeColors = this._colors[shadeName];
    if (typeof shadeColors != "object" || !(shadeVariant in shadeColors)) {
      return undefined;
    }
    const c = shadeColors[shadeVariant];
    return typeof c == "string" ? c : undefined;
  }
}
