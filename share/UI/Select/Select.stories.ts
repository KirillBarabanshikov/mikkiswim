
import type { Meta, StoryObj } from '@storybook/vue3'
import Select from './Select.vue'

// Meta information for the Select component
const meta: Meta<typeof Select> = {
    title: 'UI/Select',
    component: Select,
    tags: ['autodocs'], // Optional: Add tags for automatic docs generation
    args: {
        options: [{ label: 'первый вариант', value: 1 }, { label: 'второй вариант', value: 2 }],
        modelValue: null
    }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: (args) => ({
        components: { Select },
        setup() {
            const modelValue = ref(args.modelValue)

            const onUpdate = (value: any) => {
                modelValue.value = value
            }
            // watch(() => args.modelValue, (newVal) => {
            //     modelValue.value = newVal
            // })

            return { modelValue, options: args.options, onUpdate }
        },
        template: `
        <Select 
            v-model="modelValue"
            update:modelValue="onUpdate"
            :options="options"
        />
    `
    })
}