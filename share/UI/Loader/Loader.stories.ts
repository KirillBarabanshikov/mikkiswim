
import Loader from './Loader.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof Loader> = {
  title: 'UI/Loader',
  component: Loader,
  tags: ['autodocs'], // Optional: Add tags for automatic docs generation
  argTypes: {
  },
  args: {
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}