
import type { Meta, StoryObj } from '@storybook/vue3'
import Radio from './Radio.vue'

// Meta information for the Radio component
const meta: Meta<typeof Radio> = {
    title: 'UI/Radio',
    component: Radio,
    tags: ['autodocs'], // Optional: Add tags for automatic docs generation
    args: {

    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => ({
        components: { Radio },
        setup() {
            const modelValue = ref(args.modelValue)
            const values = ['1', '2', '3']

            watch(() => args.modelValue, (newVal) => {
                modelValue.value = newVal
            })

            return { modelValue, values }
        },
        template: `
      <div :style="{display:'flex', gap: '5px'}">
        <Radio 
            v-model="modelValue"
            value="values[1]"
        />
                <Radio 
            v-model="modelValue"
            value="values[2]"
        />
                <Radio 
            v-model="modelValue"
            value="values[3]"
        />
      </div>
    `
    })
}