import type { Meta, StoryObj } from '@storybook/vue3'
import Collapsible from './Collapsible.vue'
import { mockProduct } from '~/public/moks/mockProduct'

// Meta information for the Collapsible component
const meta = {
    title: 'UI/Collapsible',
    component: Collapsible,
    tags: ['autodocs'], // Optional: Add tags for automatic docs generation
    argTypes: {

    },
} satisfies Meta<typeof Collapsible>

export default meta

type Story = StoryObj<typeof meta>

// Default story for the Collapsible component
export const Default: Story = {
    args: {
        title: 'Заголовок',
        product: mockProduct,
    },
}
