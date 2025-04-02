import type { Meta, StoryObj } from '@storybook/vue3'
import Dialog from './Dialog.vue'
import { ref, watch } from 'vue'

const meta: Meta<typeof Dialog> = {
    title: 'UI/Dialog',
    component: Dialog,
    tags: ['autodocs'],
    args: {
        isOpen: true,
        hasClose: true
    }
}

export default meta

type Story = StoryObj<typeof Dialog>

export const Default: Story = {
    render: (args) => ({
        components: { Dialog },
        setup() {
            const isOpen = ref(args.isOpen)
            watch(() => args.isOpen, (newVal) => {
                isOpen.value = newVal
            })

            const close = () => isOpen.value = false
            return {
                isOpen,
                close,
                hasClose: args.hasClose
            }
        },
        template: `
    <Dialog 
      :isOpen="isOpen"
      :hasClose="hasClose"
      @close="close"
    >
      <template #title>
        Заголовок
      </template>
      <template #description>
        Описание
      </template>
    </Dialog>
  `
    }),

}