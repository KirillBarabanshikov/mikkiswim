
import type { Meta, StoryObj } from '@storybook/vue3'
import Badge from './Badge.vue'

// Meta information for the Badge component
const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'], // Optional: Add tags for automatic docs generation
  argTypes: {
    variant: {
      options: ['blue', 'red', 'yellow'],
      control: { type: 'radio' },
    },
    default: {
      control: 'text', // Make the slot content editable through Storybook
      description: 'Content to display inside the badge', // Optional description
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Story: Story = {
  args: {
    variant: 'blue',
    default: 'Default Badge Text',
  },
};
