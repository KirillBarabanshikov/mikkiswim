import type { Meta, StoryObj } from '@storybook/vue3'
import DatePicker from './DatePicker.vue'

const meta: Meta<typeof DatePicker> = {
    title: 'UI/DatePicker',
    component: DatePicker,
    tags: ['autodocs'],
    args: {
        name: 'Имя',
        placeholder: 'Текст'
    }
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {

}