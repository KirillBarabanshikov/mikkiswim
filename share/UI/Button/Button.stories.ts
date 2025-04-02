
import Button from './index.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

// Meta information for the Button component
const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'], // Optional: Add tags for automatic docs generation
  argTypes: {
    // Boolean props for Button
    outline: {
      control: { type: 'boolean' },
      description: 'Outline style for the button',
    },
    large: {
      control: { type: 'boolean' },
      description: 'Makes the button large',
    },
    small: {
      control: { type: 'boolean' },
      description: 'Makes the button small',
    },
    micro: {
      control: { type: 'boolean' },
      description: 'Makes the button micro-sized',
    },
    smallest: {
      control: { type: 'boolean' },
      description: 'Makes the button smallest size',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Rounded corners for the button',
    },
    block: {
      control: { type: 'boolean' },
      description: 'Makes the button block-level',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
    // Color control for the Button
    color: {
      options: [
        'black',
        'black-20',
        'black-gradient',
        'white-gradient',
        'white-20',
        'icon',
        'gray',
        'blue',
        'white-gray',
        'green',
        'red',
        'white',
      ],
      control: { type: 'radio' },
      description: 'The color of the button',
    },
    // Default slot content control
    default: {
      control: 'text', // Make the slot content editable through Storybook
      description: 'Content to display inside the Button', // Optional description
    },
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    outline: false,  // Default value for outline
    large: false,    // Default value for large
    small: false,    // Default value for small
    micro: false,    // Default value for micro
    smallest: false, // Default value for smallest
    rounded: false,  // Default value for rounded
    block: false,    // Default value for block
    disabled: false, // Default value for disabled
    color: 'blue',   // Default color for the button
    default: 'Button', // Default slot content
  },
}
