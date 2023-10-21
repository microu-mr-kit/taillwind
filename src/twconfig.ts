import resolveConfig from "tailwindcss/resolveConfig";

const COLOR_GRADIENT_RE = /^(?<name>[a-zA-Z0-9]+)-(?<gradient>[0-9]+)$/;

export class TWConfig {
  readonly config: any;

  constructor(localConfig: any) {
    this.config = resolveConfig(localConfig);
  }

  color(name: string) {
    const m = name.match(COLOR_GRADIENT_RE);
    if (m) {
      const gradient_name = m.groups!["name"];
      if (!(gradient_name in this.config.theme.colors)) {
        return undefined;
      }
      const color_gradient = this.config.theme.colors[gradient_name];
      const gradient_value = parseInt(m.groups!["gradient"]);

      if (color_gradient == undefined || !(gradient_value in color_gradient)) {
        return undefined;
      }

      return color_gradient[gradient_value];
    } else if (name in this.config.theme.colors) {
      return this.config.theme.colors[name];
    } else {
      return undefined;
    }
  }
}
