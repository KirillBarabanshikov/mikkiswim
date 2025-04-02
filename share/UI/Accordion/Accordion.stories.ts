import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from './Accordion.vue' // Adjust the path if necessary

// Meta information for the Accordion component
const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'], // Optional: Add tags for automatic docs generation
  argTypes: {
    list: { control: 'object' },
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

// Default story for the Accordion component
export const Default: Story = {
  args: {
    list: [
      {
        id: 1,
        title: 'Accordion Item 1',
        content: '<p>This is the content for item 1</p>',
      },
      {
        id: 2,
        title: 'Accordion Item 2',
        content: '<p>This is the content for item 2</p>',
      },
      {
        id: 3,
        title: 'Accordion Item 3',
        content: '<p>This is the content for item 3</p>',
      },
    ],
  },
}
