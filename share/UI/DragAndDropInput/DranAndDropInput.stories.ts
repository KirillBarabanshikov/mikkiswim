// DragDrop.stories.ts
import type { Meta, StoryObj } from '@storybook/vue3'
import DranAndDropInput from './DranAndDropInput.vue'
import { ref } from 'vue'

const meta: Meta<typeof DranAndDropInput> = {
  title: 'UI/DranAndDropInput',
  component: DranAndDropInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: false // We'll handle file selection in the story actions
    },
    placeholder: {
      control: 'text'
    },
    accept: {
      control: 'text',
      description: 'Accepted file types (e.g. "image/*", ".pdf")'
    }
  },
  args: {
    modelValue: null,
    placeholder: 'Drag and drop a file or click to browse',
    accept: '*'
  }
}

export default meta

type Story = StoryObj<typeof DranAndDropInput>

export const Default: Story = {
  render: (args) => ({
    components: { DranAndDropInput },
    setup() {
      const file = ref<File | null>(new File([], ''))
      return { file, placeholder: args.placeholder }
    },
    template: `
      <DranAndDropInput 
        v-model="file" 
        placeholder="placeholder"
        accept="args.accept"
      />
    `
  })
}
