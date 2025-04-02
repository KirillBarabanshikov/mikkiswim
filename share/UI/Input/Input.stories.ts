
import Input from './index.vue'
import type { Meta, StoryObj } from '@storybook/vue3'
import * as yup from 'yup'

const emailSchema = yup.string().email('Must be a valid email').required('Email is required')
const passwordSchema = yup.string().min(8, 'Password must be at least 8 characters').required('Password is required')

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'], // Optional: Add tags for automatic docs generation
  argTypes: {

  },
  args: {
    name: 'Input'
  }
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}

export const WithValidation: Story = {
  args: {
    name: 'emailField',
    label: 'Email with validation',
    type: 'email',
    validator: emailSchema
  }
}

export const PasswordInput: Story = {
  args: {
    name: 'passwordField',
    label: 'Password',
    type: 'password',
    validator: passwordSchema
  }
}

export const SearchInput: Story = {
  args: {
    name: 'searchField',
    type: 'search',
    placeholder: 'Search...'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Disabled value'
  }
}

export const WithPhoneMask: Story = {
  args: {
    name: 'phoneField',
    label: 'Phone number',
    placeholder: '___-___-____',
    maska: '###-###-####'
  }
}

export const WithNumberFormatting: Story = {
  args: {
    name: 'currencyField',
    label: 'Currency',
    type: 'text',
    maskaNumbers: {
      locale: 'en-US',
      fraction: 2
    }
  }
}

export const WithErrorState: Story = {
  args: {
    name: 'errorField',
    label: 'Field with error',
    validator: yup.string().required('This field is required')
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <Input 
        v-bind="args" 
        v-model="value" 
        @blur="() => value = ''"
      />
    `
  })
}

export const LoadingState: Story = {
  args: {
    name: 'loadingField',
    type: 'loading',
    label: 'Loading state'
  }
}