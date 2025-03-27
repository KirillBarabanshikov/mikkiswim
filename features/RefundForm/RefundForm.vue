<script setup lang="ts">
import { useQueryClient } from '@tanstack/vue-query'
import { type InvalidSubmissionContext, useForm } from 'vee-validate'
import { defineEmits } from 'vue'
import * as yup from 'yup'

import { useOrders } from '~/entities/order/api/query'
import { useAddRefund } from '~/entities/refund/api/query'
import type { FormScheme } from '~/features/RefundForm/types'
import { priceFormatter } from '~/share/utils/priceFormatter'

const {
  public: { API }
} = useRuntimeConfig()

const validationSchema = yup.object({
  bank: yup.string().min(2, 'Минимум 2 символа'),
  kc: yup.string().min(20, 'Минимум 20 cимволов'),
  recipient: yup.string().min(20, 'Минимум 20 cимволов'),
  bik: yup.string().min(9, 'Минимум 9 символов'),
  type: yup.string().required('Выберите тип возврата'), // для refundType
  reason: yup.string().required('Выберите причину возврата') // для reasonType
})

const { handleSubmit, resetForm, values } = useForm<FormScheme>({
  validationSchema,
  initialValues: {
    orderId: 0,
    products: [],
    type: '',
    reason: '',
    bank: '',
    recipient: '',
    kc: '',
    bik: '',
    comment: '',
    reasonColorSize: false,
    reasonDefect: false,
    reasonOther: false
  }
})

const { value: reason } = useField<string>('reason')

const reasonType = ref<string | number | null>(null)

const { mutate, isPending, isError, error } = useAddRefund()

const emit = defineEmits<{ (e: 'close'): void; (e: 'refund-success'): void }>()

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Ошибки валидации:', ctx.errors)
}

const onSubmitSuccess = (values: FormScheme) => {
  const formData = getFormData()
  console.log('Отправляемые данные:', formData)

  mutate(formData, {
    onSuccess: () => {
      resetForm()
      queryClient.invalidateQueries({ queryKey: ['refunds'] })
      emit('refund-success')
    },
    onError: (err: any) => {
      console.error('Ошибка при обновлении данных пользователя:', err)
    }
  })
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)

const closeForm = () => {
  emit('close')
}

const { data: orders, isPending: ordersLoading } = useOrders()

const queryClient = useQueryClient()

const orderOptions = computed(() => {
  if (!orders.value) return []

  return orders.value
    .filter((order) => order.products.length > 0 && order.status !== 'created')
    .map((order) => ({
      label: `Заказ от ${new Date(order.orderDate).toLocaleDateString()}`,
      value: order.id,
      order,
      images: order.products
        .map((item) => item.product.images?.[0]?.image)
        .filter(Boolean)
    }))
})

const selectedOrder = ref<any>(null)
const selectedProducts = ref<any[]>([])

const productSelectionError = ref<string>('')

const toggleProduct = (item: any) => {
  const productId = item.product.id
  const index = selectedProducts.value.findIndex(
    (selected) => selected.details.productId === productId
  )
  if (index !== -1) {
    // Если товар уже выбран, удаляем его и очищаем сообщение об ошибке
    selectedProducts.value.splice(index, 1)
    productSelectionError.value = ''
  } else {
    // Если пытаемся добавить второй товар, показываем сообщение об ошибке
    if (selectedProducts.value.length >= 1) {
      productSelectionError.value = 'Выберите только один товар'
      // Сообщение можно очистить через 3 секунды (по желанию)
      setTimeout(() => {
        productSelectionError.value = ''
      }, 3000)
      return
    }
    const defaultQuantity = item.quantity !== undefined ? item.quantity : 1
    const defaultSize = item.size || item.product.sizes?.[0]?.title || 'M'
    selectedProducts.value.push({
      product: item,
      details: {
        productId,
        quantity: defaultQuantity,
        size: defaultSize
      }
    })
  }
}
const totalPrice = computed(() =>
  selectedProducts.value.reduce(
    (sum, selectedProduct) =>
      sum +
      selectedProduct.product.product.price * selectedProduct.details.quantity,
    0
  )
)

watch(
  () => values.type,
  (newValue) => {
    if (newValue === 'all' && selectedOrder.value) {
      selectedProducts.value = selectedOrder.value.order.products.map(
        (item) => ({
          product: item,
          details: {
            productId: item.product.id,
            quantity: item.quantity,
            size: item.size
          }
        })
      )
    } else if (newValue === 'part') {
      selectedProducts.value = []
    }
  }
)

const formDataRef = ref({
  bank: '',
  recipient: '',
  kc: '',
  bik: ''
})

const getFormData = () => {
  const reasonValue =
    values.reason === 'reasonOther' ? values.comment : values.reason

  return {
    orderId: selectedOrder.value?.value || 0,
    products: selectedProducts.value.map((item) => ({
      productId: item.details.productId,
      quantity: item.details.quantity,
      size: item.details.size
    })),
    type: values.type || '',
    reason: reasonValue,
    bank: formDataRef.value.bank,
    recipient: formDataRef.value.recipient,
    kc: formDataRef.value.kc,
    bik: formDataRef.value.bik
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="form">
      <div class="form-label">Выберите заказ</div>
      <Select
        v-model="selectedOrder"
        :options="orderOptions"
        placeholder="Выбор заказа"
      />
      <div v-if="selectedOrder" class="item">
        <div class="item-label">Хочу вернуть</div>
        <Field name="type" v-slot="{ field }">
          <div class="row-radios">
            <Radio
              :model-value="field.value"
              @update:model-value="field.onChange"
              :name="field.name"
              value="part"
              label="Часть заказа"
            />
            <Radio
              :model-value="field.value"
              @update:model-value="field.onChange"
              :name="field.name"
              value="all"
              label="Весь заказ"
            />
          </div>
          <ErrorMessage name="type" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
        </Field>
      </div>
      <div v-if="values.type === 'part' && selectedOrder" class="item">
        Выберите товар, который хотите вернуть
        <div
          v-if="productSelectionError"
          class="error-message"
          style="color: red"
        >
          {{ productSelectionError }}
        </div>
        <div class="list">
          <div
            v-for="product in selectedOrder.order.products"
            :key="product.product.id"
            class="product-card"
            :class="{
              active: selectedProducts.some(
                (p) => p.details.productId === product.product.id
              )
            }"
            @click="toggleProduct(product)"
          >
            <img
              :src="`${API}${product.product.images[0].image}`"
              alt="Product image"
            />
            <div class="card-wrapper">
              <div class="subtitle category">
                {{
                  product.product.catalogs[0]?.title ?? 'Неизвестная категория'
                }}
              </div>
              <div class="subtitle product">
                {{ product.product.title }}
              </div>
              <div class="size">
                Размер <span>{{ product.product.sizes[0].title }}</span>
              </div>
              <div class="price">
                {{ priceFormatter(product.product.price) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="selectedOrder" class="item">
        <div class="item-label">Причина</div>
        <Field name="reason" v-slot="{ field }">
          <div class="column-radios">
            <Radio
              :model-value="field.value"
              @update:model-value="field.onChange"
              :name="field.name"
              value="reasonColorSize"
              label="Не подошел по цвету, размеру, фасону и т.д."
            />
            <Radio
              :model-value="field.value"
              @update:model-value="field.onChange"
              :name="field.name"
              value="reasonDefect"
              label="Товар ненадлежащего качества (брак)"
            />
            <Radio
              :model-value="field.value"
              @update:model-value="field.onChange"
              :name="field.name"
              value="reasonOther"
              label="Другая причина"
            />
          </div>
          <ErrorMessage name="reason" v-slot="{ message }">
            <span class="error-message">{{ message }}</span>
          </ErrorMessage>
        </Field>
      </div>
      <div v-if="reason === 'reasonOther' && selectedOrder" class="item">
        <Input name="comment" placeholder="Комментарий" />
      </div>
      <div v-if="selectedOrder" class="item">
        <p>
          На основании вышеизложенного и в соответствие с Законом РФ «О защите
          прав потребителей» от 07.02.92 г. № 2300-1, прошу расторгнуть со мной
          договор купли-продажи и возвратить мне сумму в размере:
        </p>
      </div>
      <div v-if="selectedOrder" class="item-sum">
        <div class="sum">{{ priceFormatter(totalPrice) }}</div>
        <div class="text">Сумма рассчитывается автоматически</div>
      </div>
      <div v-if="selectedOrder" class="form-label">
        Укажите данные банковской карты для возврата средств
      </div>
      <div v-if="selectedOrder" class="item-grid">
        <Input
          v-model="formDataRef.bank"
          name="bank"
          placeholder="Банк получателя"
        />
        <Input v-model="formDataRef.kc" name="kc" placeholder="К/с" />
        <Input
          v-model="formDataRef.recipient"
          name="recipient"
          placeholder="Счет получателя"
        />
        <Input v-model="formDataRef.bik" name="bik" placeholder="БИК" />
      </div>
      <div v-if="selectedOrder" class="form-info">
        Возврат средств
        <p>
          В течении 10-ти дней после того, как мы получим возвращенный товар Вам
          будет осуществлен возврат денежных средств. В случае возврата через
          платежные системы, срок зачисления средств на Ваш счет зависит от
          сроков, установленных внутренним регламентом соответствующих платежных
          систем или банка.
        </p>
      </div>
      <div class="form-actions">
        <Button
          v-if="selectedOrder"
          type="submit"
          variant="black"
          class="btn-submit"
          :disabled="isPending"
        >
          {{ isPending ? 'Отправка...' : 'Отправить' }}
        </Button>
        <Button type="button" color="white-gray" @click="closeForm"
          >Назад
        </Button>
      </div>
    </div>
  </form>
</template>

<style scoped lang="scss">
@use 'RefundForm';
</style>
