import type { Meta, StoryObj } from '@storybook/vue3'
import Paginate from './index.vue'

const meta: Meta<typeof Paginate> = {
  title: 'UI/Paginate',
  component: Paginate,
  tags: ['autodocs'],
  argTypes: {
    totalItems: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items to paginate'
    },
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Current active page'
    },
    itemsPerPage: {
      control: { type: 'number', min: 1 },
      description: 'Number of items per page (default: 10)'
    },
    maxPagesShown: {
      control: { type: 'number', min: 3, max: 10 },
      description: 'Maximum number of page buttons to show (default: 5)'
    },
    showEndingButtons: {
      control: { type: 'boolean' },
      description: 'Whether to show first/last page buttons (default: true)'
    }
  },
  args: {
    totalItems: 100,
    currentPage: 1,
    itemsPerPage: 10,
    maxPagesShown: 5,
    showEndingButtons: true
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Uses default args from meta
  }
}

export const ManyItems: Story = {
  args: {
    totalItems: 500,
    currentPage: 3,
    itemsPerPage: 25
  }
}

export const FewPages: Story = {
  args: {
    totalItems: 30,
    currentPage: 2,
    itemsPerPage: 10,
    maxPagesShown: 3
  }
}

export const WithoutEndButtons: Story = {
  args: {
    totalItems: 150,
    currentPage: 4,
    showEndingButtons: false
  }
}

export const CustomPageRange: Story = {
  args: {
    totalItems: 200,
    currentPage: 5,
    maxPagesShown: 7
  }
}

export const FirstPage: Story = {
  args: {
    totalItems: 100,
    currentPage: 1
  }
}

export const LastPage: Story = {
  args: {
    totalItems: 100,
    currentPage: 10
  }
}

export const MiddlePage: Story = {
  args: {
    totalItems: 100,
    currentPage: 5
  }
}