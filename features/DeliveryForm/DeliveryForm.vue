<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'

import type { Address } from '~/entities/address/model/Address'
import { useDeliveryStore } from '~/share/store/deliveryStore'
import type { AccordionItem } from '~/share/UI/Accordion/types'
import { DeviceSize, useSizeWindow } from '~/share/utils/useSizeWindow'

const props = defineProps<{
  items: {
    product: {
      id: number
      title: string
      price: number
      oldPrice: number | null
      viewers: number
      images: { image: string }[]
      slug: string
      weight: number
      length: number
      width: number
      height: number
    }
    quantity: number
    size: string
  }[]
  selectedAddress: Address | null
  steps: Array<{ step: string; title: string }>
  currentStep: { step: string; title: string }
}>()

const emit = defineEmits(['next'])

const deliveryStore = useDeliveryStore()

const activeItem = ref<AccordionItem | null>(null)
const isLoading = ref(false)
const selectedTariff = ref(null)
const router = useRouter()
const { deviceSize } = useSizeWindow()

const accordionItems = ref<AccordionItem[]>([
  {
    id: 1,
    title: 'Почта России'
  },
  {
    id: 2,
    title: 'Яндекс Доставка'
  },
  {
    id: 3,
    title: 'СДЭК'
  },
  { id: 4, title: 'Boxberry' }
])

const setActiveItem = async (item: AccordionItem) => {
  if (activeItem.value?.id === item.id) {
    activeItem.value = null
    return
  }

  activeItem.value = item
  isLoading.value = true

  const products = props.items.map((item) => ({
    productId: item.product.id,
    quantity: item.quantity
  }))

  // const mailIndex = Number(props.selectedAddress?.data?.postal_code)
  // const address = props.selectedAddress.value
  const mailIndex = 426011
  const address = 'г Ижевск, ул Удмуртская, д 267 к 1, кв 1'

  try {
    if (item.title === 'Почта России') {
      await deliveryStore.fetchPochtaTariffs(products, mailIndex)
    } else if (item.title === 'Яндекс Доставка' /*&& props.selectedAddress*/) {
      await deliveryStore.fetchYandexTariffs(
        products,
        // props.selectedAddress.value
        address
      )
    } else if (item.title === 'СДЭК') {
      await deliveryStore.fetchCdekTariffs(products, mailIndex, address)
    } else if (item.title === 'Boxberry') {
      await deliveryStore.fetchBoxberryTariffs(products, mailIndex)
    }
  } finally {
    isLoading.value = false
  }
}

const setSelectedTariff = (tariff: any) => {
  if (selectedTariff.value === tariff) {
    selectedTariff.value = null
  } else {
    selectedTariff.value = tariff
  }
}

watch(
  () => props.selectedAddress?.value,
  async (newValue) => {
    if (!newValue) return

    if (/г Москва|Московская обл/.test(newValue)) {
      const exists = accordionItems.value.some(
        (item) => item.title === 'Доставка курьером по Москве'
      )
      if (!exists) {
        await nextTick()
        accordionItems.value.push({
          id: 5,
          title: 'Доставка курьером по Москве',
          content: '<div>Курьер доставит вам заказ в течение дня.</div>'
        })
      }
    }
  },
  { deep: true, immediate: true }
)

const getDeliveryTimeText = (min: number, max: number) => {
  const days = min === max ? min : max
  if (days === 1) {
    return 'день'
  } else if (days >= 2 && days <= 4) {
    return 'дня'
  } else {
    return 'дней'
  }
}

const goToContacts = () => {
  router.push('/contacts')
}

const initEcomWidget = async () => {
  await nextTick()
  const container = document.getElementById('ecom-widget')

  if (!container) {
    console.warn('Не найден контейнер для виджета!')
    return
  }

  if (
    !document.querySelector(
      'script[src="https://widget.pochta.ru/map/widget/widget.js"]'
    )
  ) {
    const script = document.createElement('script')
    script.src = 'https://widget.pochta.ru/map/widget/widget.js'
    script.onload = () => {
      ecomStartWidget({
        id: 51059,
        weight: 300,
        callbackFunction: null,
        containerId: 'ecom-widget',
        order_lines: props.items.map((item) => ({
          quantity: item.quantity,
          length: item.product.length,
          width: item.product.width,
          height: item.product.height
        }))
      })
    }
    document.body.appendChild(script)
  } else {
    ecomStartWidget({
      id: 51059,
      weight: 300,
      callbackFunction: null,
      containerId: 'ecom-widget',
      order_lines: props.items.map((item) => ({
        quantity: item.quantity,
        length: item.product.length,
        width: item.product.width,
        height: item.product.height
      }))
    })
  }
}

const initDeliveryWidget = async () => {
  await nextTick()
  const script = document.createElement('script')
  script.src = 'https://ndd-widget.landpro.site/widget.js'
  script.async = true
  document.body.appendChild(script)
  script.onload = () => {
    ;(function (w) {
      function startWidget() {
        w.YaDelivery.createWidget({
          containerId: 'delivery-widget',
          params: {
            size: {
              height: '450px',
              width: '100%'
            },
            physical_dims_weight_gross: 10000,
            delivery_price: 'от 100',
            delivery_term: 'от 1 дня',
            show_select_button: true,
            filter: {
              type: ['pickup_point', 'terminal'],
              is_yandex_branded: false,
              payment_methods: ['already_paid', 'card_on_receipt'],
              payment_methods_filter: 'or'
            },
            suggest: false,
            minify_on_zoom: 14,
            grid_size: 124
          }
        })
      }
      w.YaDelivery
        ? startWidget()
        : document.addEventListener('YaNddWidgetLoad', startWidget)
    })(window)
    document.addEventListener('YaNddWidgetPointSelected', function (data) {
      console.log(data.detail)
    })
  }
}

const initCdekWidget = async () => {
  await nextTick()
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/@cdek-it/widget@3'
  script.onload = () => {
    new window.CDEKWidget({
      from: {
        country_code: 'RU',
        city: 'Новосибирск',
        postal_code: 630009,
        code: 270,
        address: 'ул. Большевистская, д. 101'
      },
      root: 'cdek-map',
      apiKey: '293b41ca-1aba-474c-bf81-de1e04d63f93',
      canChoose: true,
      servicePath: 'https://mikkiswim-api.itlabs.top/cdek_service.php',
      hideFilters: {
        have_cashless: false,
        have_cash: false,
        is_dressing_room: false,
        type: false
      },
      hideDeliveryOptions: {
        office: false,
        door: true
      },
      debug: false,
      goods: [
        {
          width: 1000,
          height: 1000,
          length: 1000,
          weight: 1000
        }
      ],
      defaultLocation: 'Москва',
      lang: 'rus',
      currency: 'RUB'
    })
  }
  document.body.appendChild(script)
}

const initBoxberryWidget = async () => {
  await nextTick()
  const script = document.createElement('script')
  script.src = 'https://points.boxberry.de/js/boxberry.js'
  script.onload = () => {
    const apiToken = 'fc132e39696df433cc07ad7457e8bb59'
    const customCity = 'Ижевск'
    const targetStart = 'Ижевск'
    const orderSum = '1000'
    const weight = '500'
    const paySum = '0'
    const height = '50'
    const width = '50'
    const depth = '50'
    boxberry.openOnPage('boxberry_map')
    boxberry.open(
      apiToken,
      customCity,
      targetStart,
      orderSum,
      weight,
      paySum,
      height,
      width,
      depth
    )
  }
  document.body.appendChild(script)
}

watch(selectedTariff, async (newTariff) => {
  if (newTariff?.pvz) {
    if (activeItem.value?.title === 'Почта России') {
      await initEcomWidget()
    } else if (activeItem.value?.title === 'СДЭК') {
      await initCdekWidget()
    } else if (activeItem.value?.title === 'Boxberry') {
      await initBoxberryWidget()
    } else if (activeItem.value?.title === 'Яндекс Доставка') {
      await initDeliveryWidget()
    }
  }
})
</script>

<template>
  <section v-if="deviceSize > DeviceSize.MOBILE" class="delivery">
    <div class="delivery-tariffs">
      <div class="delivery-title">Способ доставки</div>
      <div class="accordion">
        <div class="accordion-list">
          <template v-for="item in accordionItems" :key="item.id">
            <div :class="['item', { active: activeItem?.id === item.id }]">
              <div class="item-header" @click="setActiveItem(item)">
                <span>{{ item.title }}</span>
                <IconArrowDown class="item-icon" />
              </div>
              <div class="item-content">
                <div v-if="activeItem?.id === item.id">
                  <div v-if="isLoading" class="loading">Загрузка...</div>

                  <div
                    class="accordion-buttons"
                    v-if="item.title === 'Почта России'"
                  >
                    <template
                      v-for="tariff in deliveryStore.pochtaTariffs"
                      :key="tariff.name"
                    >
                      <button
                        class="accordion-button"
                        :class="{ selected: selectedTariff === tariff }"
                        @click="setSelectedTariff(tariff)"
                      >
                        <div class="button-content">
                          <div
                            class="button-text"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.name }}
                          </div>
                          <div
                            class="button-cost"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.cost.total }} руб.
                          </div>
                        </div>
                      </button>
                      <div
                        v-if="selectedTariff === tariff && tariff.pvz"
                        class="pvz-widget"
                      >
                        <div class="pvz-text">Выберите пункт выдачи</div>
                        <div id="ecom-widget" style="height: 500px"></div>
                      </div>
                    </template>
                  </div>

                  <div
                    class="accordion-buttons"
                    v-if="item.title === 'Яндекс Доставка'"
                  >
                    <div id="delivery-widget"></div>
                    <!--                    <template-->
                    <!--                      v-for="tariff in deliveryStore.yandexTariffs"-->
                    <!--                      :key="tariff.name"-->
                    <!--                    >-->
                    <!--                      <button-->
                    <!--                        class="accordion-button"-->
                    <!--                        :class="{ selected: selectedTariff === tariff }"-->
                    <!--                        @click="setSelectedTariff(tariff)"-->
                    <!--                      >-->
                    <!--                        <div class="button-content">-->
                    <!--                          <div-->
                    <!--                            class="button-text"-->
                    <!--                            :class="{ selected: selectedTariff === tariff }"-->
                    <!--                          >-->
                    <!--                            {{ tariff.name }}-->
                    <!--                          </div>-->
                    <!--                          <div-->
                    <!--                            class="button-cost"-->
                    <!--                            :class="{ selected: selectedTariff === tariff }"-->
                    <!--                          >-->
                    <!--                            {{ tariff.cost.total }} руб.-->
                    <!--                          </div>-->
                    <!--                        </div>-->
                    <!--                      </button>-->
                    <!--                      <div-->
                    <!--                        v-if="selectedTariff === tariff && tariff.pvz"-->
                    <!--                        class="pvz-widget"-->
                    <!--                      >-->
                    <!--                        <div class="pvz-text">Выберите пункт выдачи</div>-->
                    <!--                        Тут будет виджет-->
                    <!--                      </div>-->
                    <!--                    </template>-->
                  </div>

                  <div class="accordion-buttons" v-if="item.title === 'СДЭК'">
                    <template
                      v-for="tariff in deliveryStore.cdekTariffs"
                      :key="tariff.name"
                    >
                      <button
                        class="accordion-button"
                        :class="{ selected: selectedTariff === tariff }"
                        @click="setSelectedTariff(tariff)"
                      >
                        <div class="button-content">
                          <div
                            class="button-text"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.name }}
                          </div>
                          <div
                            class="button-cost"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.cost.total }} руб.
                          </div>
                        </div>
                      </button>
                      <div
                        v-if="selectedTariff === tariff && tariff.pvz"
                        class="pvz-widget"
                      >
                        <div class="pvz-text">Выберите пункт выдачи</div>
                        <div id="cdek-map" style="height: 500px"></div>
                      </div>
                    </template>
                  </div>

                  <div
                    class="accordion-buttons"
                    v-if="item.title === 'Boxberry'"
                  >
                    <template
                      v-for="tariff in deliveryStore.boxberryTariffs"
                      :key="tariff.name"
                    >
                      <button
                        class="accordion-button"
                        :class="{ selected: selectedTariff === tariff }"
                        @click="setSelectedTariff(tariff)"
                      >
                        <div class="button-content">
                          <div
                            class="button-text"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.name }}
                          </div>
                          <div
                            class="button-cost"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.cost.total }} руб.
                          </div>
                        </div>
                      </button>
                      <div
                        v-if="selectedTariff === tariff && tariff.pvz"
                        class="pvz-widget"
                      >
                        <div class="pvz-text">Выберите пункт выдачи</div>
                        <div id="boxberry_map"></div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="selectedTariff" class="delivery-info">
      <div class="delivery-options">
        <p class="delivery-cost">
          Стоимость доставки составит:
          {{ selectedTariff.cost.total }} руб.
        </p>
        <p class="delivery-time">
          Приблизительный срок доставки составит
          <span>
            {{ selectedTariff.deliveryTime.min }}
            <span
              v-if="
                selectedTariff.deliveryTime.min !==
                selectedTariff.deliveryTime.max
              "
            >
              - {{ selectedTariff.deliveryTime.max }}
            </span>
          </span>
          {{
            getDeliveryTimeText(
              selectedTariff.deliveryTime.min,
              selectedTariff.deliveryTime.max
            )
          }}
        </p>
      </div>
      <div class="delivery-checkbox">
        <Checkbox
          name="personalData"
          label="Я согласен на обработку моих персональных данных"
        ></Checkbox>
        <Checkbox name="comment" label="Комментарий к заказу" />
      </div>
    </div>
    <div class="delivery-contacts">
      <div class="contacts-text">
        <p class="contacts-question">Возникли вопросы с доставкой?</p>
        <p>Позвоните или напишите нам</p>
      </div>
      <Button outline class="contacts-button" @click="goToContacts"
        >Контакты</Button
      >
    </div>
  </section>

  <section v-else class="delivery">
    <div class="delivery-tariffs">
      <div class="form-header">Оформление заказа</div>
      <div class="stepper">
        <div class="steps">
          <div
            v-for="step in steps"
            :key="step.step"
            class="steps-item"
            :class="{ active: currentStep.step === step.step }"
          >
            <span>{{ step.title }}</span>
          </div>
        </div>
      </div>
      <div class="delivery-title">Способ доставки</div>
      <div class="accordion">
        <div class="accordion-list">
          <template v-for="item in accordionItems" :key="item.id">
            <div :class="['item', { active: activeItem?.id === item.id }]">
              <div class="item-header" @click="setActiveItem(item)">
                <span>{{ item.title }}</span>
                <IconArrowDown class="item-icon" />
              </div>
              <div class="item-content">
                <div v-if="activeItem?.id === item.id">
                  <div v-if="isLoading" class="loading">Загрузка...</div>

                  <div
                    class="accordion-buttons"
                    v-if="item.title === 'Почта России'"
                  >
                    <template
                      v-for="tariff in deliveryStore.pochtaTariffs"
                      :key="tariff.name"
                    >
                      <button
                        class="accordion-button"
                        :class="{ selected: selectedTariff === tariff }"
                        @click="setSelectedTariff(tariff)"
                      >
                        <div class="button-content">
                          <div
                            class="button-text"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.name }}
                          </div>
                          <div
                            class="button-cost"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.cost.total }} руб.
                          </div>
                        </div>
                      </button>
                      <div
                        v-if="selectedTariff === tariff && tariff.pvz"
                        class="pvz-widget"
                      >
                        <div class="pvz-text">Выберите пункт выдачи</div>
                        <div id="ecom-widget" style="height: 500px"></div>
                      </div>
                    </template>
                  </div>

                  <div
                    class="accordion-buttons"
                    v-if="item.title === 'Яндекс Доставка'"
                  >
                    <template
                      v-for="tariff in deliveryStore.yandexTariffs"
                      :key="tariff.name"
                    >
                      <button
                        class="accordion-button"
                        :class="{ selected: selectedTariff === tariff }"
                        @click="setSelectedTariff(tariff)"
                      >
                        <div class="button-content">
                          <div
                            class="button-text"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.name }}
                          </div>
                          <div
                            class="button-cost"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.cost.total }} руб.
                          </div>
                        </div>
                      </button>
                      <div
                        v-if="selectedTariff === tariff && tariff.pvz"
                        class="pvz-widget"
                      >
                        <div class="pvz-text">Выберите пункт выдачи</div>
                        Тут будет виджет
                      </div>
                    </template>
                  </div>

                  <div class="accordion-buttons" v-if="item.title === 'СДЭК'">
                    <template
                      v-for="tariff in deliveryStore.cdekTariffs"
                      :key="tariff.name"
                    >
                      <button
                        class="accordion-button"
                        :class="{ selected: selectedTariff === tariff }"
                        @click="setSelectedTariff(tariff)"
                      >
                        <div class="button-content">
                          <div
                            class="button-text"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.name }}
                          </div>
                          <div
                            class="button-cost"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.cost.total }} руб.
                          </div>
                        </div>
                      </button>
                      <div
                        v-if="selectedTariff === tariff && tariff.pvz"
                        class="pvz-widget"
                      >
                        <div class="pvz-text">Выберите пункт выдачи</div>
                        <div id="cdek-map" style="height: 500px"></div>
                      </div>
                    </template>
                  </div>

                  <div
                    class="accordion-buttons"
                    v-if="item.title === 'Boxberry'"
                  >
                    <template
                      v-for="tariff in deliveryStore.boxberryTariffs"
                      :key="tariff.name"
                    >
                      <button
                        class="accordion-button"
                        :class="{ selected: selectedTariff === tariff }"
                        @click="setSelectedTariff(tariff)"
                      >
                        <div class="button-content">
                          <div
                            class="button-text"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.name }}
                          </div>
                          <div
                            class="button-cost"
                            :class="{ selected: selectedTariff === tariff }"
                          >
                            {{ tariff.cost.total }} руб.
                          </div>
                        </div>
                      </button>
                      <div
                        v-if="selectedTariff === tariff && tariff.pvz"
                        class="pvz-widget"
                      >
                        <div class="pvz-text">Выберите пункт выдачи</div>
                        <div id="boxberry_map"></div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div v-if="selectedTariff" class="delivery-info">
      <div class="delivery-options">
        <p class="delivery-cost">
          Стоимость доставки составит:
          {{ selectedTariff.cost.total }} руб.
        </p>
        <p class="delivery-time">
          Приблизительный срок доставки составит
          <span>
            {{ selectedTariff.deliveryTime.min }}
            <span
              v-if="
                selectedTariff.deliveryTime.min !==
                selectedTariff.deliveryTime.max
              "
            >
              - {{ selectedTariff.deliveryTime.max }}
            </span>
          </span>
          {{
            getDeliveryTimeText(
              selectedTariff.deliveryTime.min,
              selectedTariff.deliveryTime.max
            )
          }}
        </p>
      </div>
      <div class="delivery-checkbox">
        <Checkbox
          name="personalData"
          label="Я согласен на обработку моих персональных данных"
        ></Checkbox>
        <Checkbox name="comment" label="Комментарий к заказу" />
      </div>
    </div>
    <div class="delivery-contacts">
      <div class="contacts-text">
        <p class="contacts-question">Возникли вопросы с доставкой?</p>
        <p>Позвоните или напишите нам</p>
      </div>
      <Button outline class="contacts-button" @click="goToContacts"
        >Контакты</Button
      >
    </div>
  </section>
</template>

<style scoped lang="scss">
@use '/app/assets/scss/variables' as *;

.delivery {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 36px;

  &-title {
    font-weight: 700;
    font-size: 14px;
    margin-bottom: 16px;
    color: var(--gray);
  }

  &-tariffs {
    display: flex;
    flex-direction: column;
    width: 555px;
  }

  &-info {
    display: flex;
    flex-direction: column;
    gap: 36px;
  }

  &-options {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &-cost {
    font-weight: 700;
    font-size: 14px;
    line-height: 155%;
    color: var(--green);
  }

  &-time {
    font-weight: 400;
    font-size: 14px;
    line-height: 155%;
    color: var(--black);
  }

  &-checkbox {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &-contacts {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .contacts-question {
      font-weight: 700;
    }

    .contacts-button {
      width: 214px;
      color: var(--gray);
    }
  }
}

.accordion {
  &-list,
  &-buttons {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    width: 554px;
    height: 48px;
    background: var(--gray-300);
    transition: background 0.3s ease;

    &:hover,
    &.selected {
      background: var(--green);

      .button-text,
      .button-cost {
        color: var(--white) !important;
      }
    }

    .button-content {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 40px;

      .button-text {
        font-size: 16px;
        font-weight: 700;
        line-height: 155%;
        text-align: center;
        color: var(--gray);
        transition: color 0.3s ease;
      }
      .button-cost {
        font-size: 16px;
        line-height: 155%;
        text-align: center;
        color: var(--gray);
        transition: color 0.3s ease;
      }

      .pvz-widget {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: var(--blue);
        margin-top: 8px;
      }
    }
  }
}

.item {
  border-radius: 20px;

  @media (max-width: $md3 + px) {
    border-radius: 16px;
    width: 100vw;
  }

  &-header {
    padding: 16px 0;
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    user-select: none;
    cursor: pointer;
    align-items: center;

    span {
      text-align: left;
      font-weight: 700;
      font-size: 16px;
      line-height: 155%;
      text-transform: uppercase;
    }

    @media (max-width: $md2 + px) {
      padding: 16px;
      font-size: 16px;
    }
  }

  &-icon {
    width: 16px;
    color: var(--black);
    transition: transform 300ms;

    @media (max-width: $md2 + px) {
      width: 24px;
      height: 24px;
    }
  }

  &-content {
    font-size: 14px;
    line-height: 155%;
    overflow: hidden;
    transition: all 0.3s ease-out;
    display: flex;
    justify-content: center;
    padding: 0 30px;

    @media (max-width: $md2 + px) {
      padding: 0 16px;
    }
  }

  &.active {
    .item-content {
      display: flex;
      justify-content: center;
    }

    .item-icon {
      transform: rotate(180deg);
    }
  }
}

.loading {
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: var(--gray);
  padding: 10px;
}

.comment-field {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid var(--gray);
  margin-top: 8px;
  resize: vertical;
}

.form-header {
  display: flex;
  justify-content: center;
  font-weight: 700;
  font-size: 19px;
  line-height: 150%;
  text-align: center;
}

.stepper {
  display: flex;
  justify-content: center;
  margin: 24px;
}

.steps {
  display: flex;
  align-items: center;
  gap: 8px;

  &-item {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 14px;
    color: var(--gray-400);

    &.active {
      color: var(--black);
    }
  }
}

@media (max-width: #{$md3 + px}) {
  .delivery {
    &-tariffs {
      width: 100vw;
    }
    &-title {
      padding-left: 16px;
    }
    &-contacts {
      flex-direction: column;
      gap: 24px;
    }
    &-info {
      padding: 0 16px;
    }
  }
  .contacts-text {
    text-align: center;
  }
  .accordion {
    &-button {
      width: 100vw;
    }
  }
}

@media (max-width: #{$md2 + px}) {
  .delivery {
    &-title {
      padding-left: 16px;
    }
    &-contacts {
      flex-direction: column;
      gap: 24px;
    }
    &-info {
      padding: 0 16px;
    }
  }
  .contacts-text {
    text-align: center;
  }
}
</style>
