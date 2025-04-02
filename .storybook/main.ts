import path from 'path';
import type { StorybookConfig } from "@storybook/vue3";

const config: StorybookConfig = {
  stories: ["../share/UI/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: ["@storybook/addon-essentials", '@storybook/addon-controls'],
  framework: {
    name: "@storybook/vue3-vite",
    options: {}
  },
  viteFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~': path.resolve(__dirname, ".."),
    }
    return config
  },
};

export default config