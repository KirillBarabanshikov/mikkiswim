import type { Meta, StoryObj } from '@storybook/vue3'
import Modal from './index.vue'
import { ref, watch } from 'vue'

const meta: Meta<typeof Modal> = {
    title: 'UI/Modal',
    component: Modal,
    tags: ['autodocs'],
    args: {
        isOpen: true,
    }
}

export default meta

type Story = StoryObj<typeof Modal>

export const Default: Story = {
    render: (args) => ({
        components: { Modal },
        setup() {
            const isOpen = ref(args.isOpen)
            watch(() => args.isOpen, (newVal) => {
                isOpen.value = newVal
            })

            const update = (value: boolean) => isOpen.value = value
            const close = () => isOpen.value = false
            return {
                isOpen,
                close,
                update
            }
        },
        template: `
    <Modal 
      :isOpen="isOpen"
      :hasClose="hasClose"
      @update:isOpen="update"
      @close="close"
    >
      <template #content>
        Контент
      </template>
    </Modal>
  `
    }),

}