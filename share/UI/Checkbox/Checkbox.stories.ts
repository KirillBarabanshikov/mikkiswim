import type { Meta, StoryObj } from '@storybook/vue3'
import Checkbox from './index.vue'

// Meta information for the Checkbox component
const meta = {
    title: 'UI/Checkbox',
    component: Checkbox,
    tags: ['autodocs'], // Optional: Add tags for automatic docs generation
    argTypes: {

    },
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

// Default story for the Checkbox component
export const Default: Story = {
    args: {
        defaultChecked: true,
    },
}
