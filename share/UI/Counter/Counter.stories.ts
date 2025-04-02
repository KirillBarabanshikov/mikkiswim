import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watch } from 'vue'
import Counter from './Counter.vue'

const meta: Meta<typeof Counter> = {
    title: 'UI/Counter',
    component: Counter,
    tags: ['autodocs'],
    argTypes: {
        modelValue: { control: 'number' },
        max: { control: 'number' }
    },
    args: {
        modelValue: 0,
        max: 10
    }
}

export default meta

type Story = StoryObj<typeof Counter>

export const Default: Story = {
    render: (args) => ({
        components: { Counter },
        setup() {
            const counterValue = ref(args.modelValue)

            watch(() => args.modelValue, (newVal) => {
                counterValue.value = newVal
            })

            return { counterValue, max: args.max }
        },
        template: `
      <Counter 
        v-model="counterValue"
        :max="max"
      />
    `
    })
}