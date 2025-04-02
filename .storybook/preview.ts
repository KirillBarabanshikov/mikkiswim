
import '../app/assets/scss/variables.scss';
import { setup } from '@storybook/vue3';
import type { App } from "vue"
import { ref, computed, toRefs, watch, watchEffect } from "vue"

globalThis.ref = ref;
globalThis.computed = computed
globalThis.toRefs = toRefs
globalThis.watch = watch
globalThis.watchEffect = watchEffect
globalThis.useRuntimeConfig = () => ({
  public: { API: '' }
})

//@ts-nocheck
const icons = import.meta.glob('../share/UI/Icons/*.vue', { eager: true });

setup((app) => {
  registerIconComponents(app)
});

export const parameters = {
  // actions: { argTypesRegex: '^on[A-Z].*' },
  tags: ['autodocs'],
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

function getComponentNameFromPath(path: string): string {
  return path.split('/').pop()?.replace(/\.\w+$/, '') || '';
}

function registerIconComponents(app: App) {
  for (const path in icons) {
    const component = icons[path]?.default;
    if (component) {
      const componentName = component.name || getComponentNameFromPath(path);
      if (componentName) {
        // console.log(`Registering component: ${componentName}`);
        app.component(componentName, component);
      } else {
        // console.warn(`Skipping ${path}: Component name is missing`);
      }
    }
  }
}

