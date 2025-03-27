<script setup lang="ts">
import { type InvalidSubmissionContext, useForm } from 'vee-validate'
import * as yup from 'yup'

import { useProduct } from '~/entities/product/api/query'
import type { Product } from '~/entities/product/model/Product'
import {
  useAddReview,
  useEditReview,
  useReviews
} from '~/entities/review/api/query'
import IconPhoto from '~/share/UI/Icons/IconPhoto.vue'
import StarsPicker from '~/widgets/Reviews/components/ReviewDialog/StarsPicker/StarsPicker.vue'

const {
  public: { API }
} = useRuntimeConfig()
const { unlock } = useBodyLock()

const props = defineProps<{
  product: Product
  isOpen: boolean
  edit?: ReviewForm
  reviewId?: number
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', status: boolean): void
  (e: 'edit-success'): void
}>()

const { mutate: sendReview, isPending } = useAddReview()
const { mutate: editReview } = useEditReview()
let refetchProduct: Function | null = null
watch(
  () => props.product.slug,
  (newSlug) => {
    if (newSlug) {
      // Инициализировать useProduct, когда slug будет определён
      ;({ refetch: refetchProduct } = useProduct(newSlug))
    }
  },
  { immediate: true }
)
const { refetch: refetchReviews } = useReviews()

const images = ref<string[]>([])

const existingImages = computed(() =>
  props.edit && props.edit.images
    ? props.edit.images.map(
        (img: { id: number; image: string }) => API + img.image
      )
    : []
)

interface ReviewForm {
  id?: number
  stars: string
  advantages: string
  flaws: string
  comment: string
  images?: []
  file?: File[]
}

const { handleSubmit, values, setFieldValue, resetForm } = useForm<ReviewForm>({
  initialValues: {
    stars: props.edit?.stars || '',
    advantages: props.edit?.advantages || '',
    flaws: props.edit?.flaws || '',
    comment: props.edit?.comment || '',
    file: []
  }
})

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && props.edit) {
      resetForm({
        values: {
          stars: props.edit.stars || '',
          advantages: props.edit.advantages || '',
          flaws: props.edit.flaws || '',
          comment: props.edit.comment || '',
          file: []
        }
      })
    }
  }
)

const close = () => {
  emit('update:isOpen', false)
  unlock()
  images.value = []
  resetForm()
}

const showPopup = ref(false)
const popupMessage = ref('')

const removeImage = (index: number) => {
  const currentFiles = values.file || []
  const currentImages = [...images.value]

  currentFiles.splice(index, 1)
  currentImages.splice(index, 1)

  setFieldValue('file', currentFiles)
  images.value = currentImages
}

const setFiles = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files) return

  const newFiles = Array.from(target.files)
  const availableSlots = 10 - existingImages.value.length - images.value.length

  if (newFiles.length > availableSlots) {
    newFiles.splice(availableSlots)
    popupMessage.value =
      availableSlots === 0
        ? 'Достигнут лимит в 10 фотографий'
        : `Можно добавить только ${availableSlots} файлов`
    showPopup.value = true
    setTimeout(() => (showPopup.value = false), 3000)
  }

  const remainingSlots = Math.max(0, availableSlots - newFiles.length)
  if (newFiles.length === 10 && remainingSlots === 0) {
    popupMessage.value = 'Достигнут лимит в 10 фотографий'
    showPopup.value = true
    setTimeout(() => (showPopup.value = false), 3000)
  }

  const currentFiles = values.file || []
  setFieldValue('file', [...currentFiles, ...newFiles])

  newFiles.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        images.value = [...images.value, e.target.result]
      }
    }
    reader.readAsDataURL(file)
  })
}

const onSubmitSuccess = () => {
  const formData = new FormData()

  if (Array.isArray(values.file)) {
    values.file.forEach((file) => {
      formData.append('images[]', file, file.name)
    })
  }

  formData.append('productId', props.product.id.toString())
  formData.append('advantages', values.advantages)
  formData.append('flaws', values.flaws)
  formData.append('comment', values.comment)
  formData.append('stars', values.stars)

  if (props.edit) {
    editReview(
      { formData, id: props.reviewId },
      {
        onSuccess: async () => {
          await refetchReviews()
          emit('edit-success')
          close()
        }
      }
    )
  } else {
    sendReview(formData, {
      onSuccess: async () => {
        if (refetchProduct) {
          await refetchProduct()
        }
        await refetchReviews()
        close()
      }
    })
  }
}

const onSubmitError = (ctx: InvalidSubmissionContext) => {
  console.error('Ошибка валидации:', ctx)
}

const onSubmit = handleSubmit(onSubmitSuccess, onSubmitError)
</script>

<template>
  <Transition name="fade">
    <div v-if="isOpen" class="popup" @click="close">
      <div class="popup-content" @click.stop>
        <div class="popup-title">Отзыв к товару</div>
        <div class="popup-product">
          <img :src="API + product.images[0].image" alt="" />
          <div class="info">
            {{ product.catalogs[0].title }}
            <span>{{ product.title }}</span>
          </div>
        </div>
        <form class="popup-form" @submit.prevent="onSubmit">
          <div class="popup-form-item stars-item">
            <div class="popup-form-label">Оцените товар</div>
            <StarsPicker
              name="stars"
              :validator="yup.string().required('Оценка обязательна')"
            />
          </div>
          <div class="popup-form-fields">
            <Input
              name="advantages"
              placeholder="Достоинства"
              :validator="
                yup
                  .string()
                  .required('Заполнить обязательно')
                  .min(1, '1 минимум')
              "
            />
            <Input
              name="flaws"
              placeholder="Недостатки"
              :validator="
                yup
                  .string()
                  .required('Заполнить обязательно')
                  .min(1, '1 минимум')
              "
            />
            <Input
              name="comment"
              placeholder="Комментарии"
              :validator="
                yup
                  .string()
                  .required('Заполнить обязательно')
                  .max(256, 'Максимально 256 символов')
              "
            />
          </div>
          <div v-if="existingImages.length" class="popup-form-item">
            <div class="popup-form-label">Загрузите до 10 фотографий</div>
            <div class="file flex">
              <template v-for="(img, index) in existingImages" :key="index">
                <img
                  :src="img"
                  alt="Прикрепленное изображение"
                  class="review-img"
                />
              </template>
            </div>
          </div>
          <div class="popup-form-item file-item">
            <div :class="['file', { grid: images.length }]">
              <template v-for="(item, index) in images" :key="index">
                <div class="image-wrapper">
                  <img :src="item" alt="Новое изображение" />
                  <button
                    class="remove-btn"
                    @click="removeImage(index)"
                    title="Удалить фото"
                  >
                    ✕
                  </button>
                </div>
              </template>
              <div class="file-input">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .bmp, .gif, .webp"
                  multiple
                  @change="setFiles"
                  :key="images.length"
                />
                <IconPhoto />
              </div>
            </div>
            <div v-if="!images.length && !existingImages.length" class="info">
              Нажмите на область с иконкой
              <span>Фото до 10 МБ. Формат JPG, JPEG, PNG, BMP, GIF, WEBP.</span>
            </div>
          </div>
          <div class="popup-form-actions">
            <Button
              variant="gray"
              size="small"
              type="button"
              class="popup-form-btn"
              block
              @click="close"
            >
              Отмена
            </Button>
            <Button
              variant="black"
              size="small"
              type="submit"
              class="popup-form-btn"
              block
              :disabled="isPending"
            >
              {{ isPending ? 'Отправка...' : 'Отправить' }}
            </Button>
          </div>
        </form>
        <Transition name="fade">
          <div v-if="showPopup" class="popup-notification">
            {{ popupMessage }}
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
@use '/app/assets/scss/variables' as *;

.popup {
  position: fixed;
  inset: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;

  &-content {
    background-color: var(--white);
    padding: 24px;
    border-radius: 16px;
    max-width: 850px;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }

  &-title {
    font-weight: 700;
    font-size: 20px;
    margin: 0 0 16px;
  }

  &-product {
    display: flex;
    align-items: center;
    gap: 16px;

    img {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      object-fit: cover;
    }

    .info {
      display: flex;
      flex-direction: column;
      line-height: 155%;
      font-size: 12px;

      span {
        font-size: 16px;
        font-weight: 700;
      }
    }
  }

  &-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    margin-top: 36px;

    &-fields {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
    }

    &-item {
      width: 100%;

      &.stars-item {
        display: flex;
        flex-direction: column;
        gap: 16px;

        div {
          display: flex;
        }
      }

      &.file-item {
        display: flex;
        align-items: center;
        gap: 16px;

        .file {
          display: flex;
          gap: 16px;
          flex: 0 0 64px;
          width: 64px;

          &.grid {
            display: grid;
            grid-template-columns: repeat(6, 58px);
            width: 100%;
            flex: 0 1 100%;
          }

          &.flex {
            display: flex;
            gap: 16px;
            width: 100%;
            flex-wrap: wrap;
          }

          &-input {
            position: relative;
            width: 100%;
            flex: 0 0 100%;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--gray-400);
            border-radius: 8px;
          }

          img {
            width: 100%;
            flex: 0 0 100%;
            height: 80px;
            border-radius: 8px;
            object-fit: cover;
          }

          input {
            width: 100%;
            height: 100%;
            opacity: 0;
            z-index: 1;
            cursor: pointer;
          }

          svg {
            position: absolute;
            width: 20px;
            z-index: 0;
          }
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          height: 80px;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
          }

          .remove-btn {
            position: absolute;
            top: 4px;
            right: 4px;
            width: 20px;
            height: 20px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 12px;
            line-height: 1;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          &:hover .remove-btn {
            opacity: 1;
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          line-height: 155%;
          font-size: 12px;

          span {
            color: var(--gray);
          }
        }
      }
    }

    &-label {
      text-align: left;
      width: 100%;
      font-weight: 700;
      font-size: 14px;
    }

    .file {
      &.flex {
        display: grid;
        grid-template-columns: repeat(6, 58px);
        gap: 10px 16px;
      }
    }

    &-link {
      cursor: pointer;
      font-size: 14px;
    }

    &-actions {
      width: 100%;
      display: flex;
      justify-content: space-between;
      gap: 32px;
    }
  }
}

.popup-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  z-index: 1000;
  font-size: 14px;
  max-width: 90vw;
}

.review-img {
  margin-top: 16px;
  width: 64px;
  height: 80px;
  margin-right: 16px;
  border-radius: 8px;
  object-fit: cover;
}

@media (max-width: $md2 + px) {
  .review {
    padding: 0;
  }
  .remove-btn {
    opacity: 1 !important;
  }
}

@media (max-width: $md3 + px) {
  .review {
    width: calc(100dvw - 40px);

    &-form {
      max-width: 100%;

      &-btn {
        width: 100%;
      }
    }
  }
  .popup-form-item.file-item .file.grid {
    grid-template-columns: repeat(4, 58px) !important;
  }
}
</style>
