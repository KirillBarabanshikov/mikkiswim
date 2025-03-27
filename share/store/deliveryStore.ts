//@ts-ignore

import { ref } from 'vue'

import {
  getBoxberryTariff,
  getCdekTariff,
  getPochtaTariff,
  getYandexTariff
} from '~/share/api/order'

export const useDeliveryStore = defineStore('tariff', () => {
  const pochtaTariffs = ref(null)
  const yandexTariffs = ref(null)
  const cdekTariffs = ref(null)
  const boxberryTariffs = ref(null)
  const hasFetchedTariffs = ref({
    pochta: false,
    yandex: false,
    cdek: false,
    boxberry: false
  })

  const fetchPochtaTariffs = async (products, mailIndex) => {
    if (hasFetchedTariffs.value.pochta) return
    try {
      const tariffs = await getPochtaTariff(mailIndex, products)
      pochtaTariffs.value = tariffs
      hasFetchedTariffs.value.pochta = true
      console.log('Тарифы Почты:', tariffs)
    } catch (error) {
      console.error('Ошибка при получении тарифов Почты:', error)
    }
  }

  const fetchYandexTariffs = async (products, address) => {
    if (hasFetchedTariffs.value.yandex) return
    try {
      const tariffs = await getYandexTariff(address, products)
      yandexTariffs.value = tariffs
      hasFetchedTariffs.value.yandex = true
      console.log('Тарифы Яндекса:', tariffs)
    } catch (error) {
      console.error('Ошибка при получении тарифов Яндекса:', error)
    }
  }

  const fetchCdekTariffs = async (products, mailIndex, addressTo) => {
    if (hasFetchedTariffs.value.cdek) return
    try {
      const tariffs = await getCdekTariff(mailIndex, products, addressTo)
      cdekTariffs.value = tariffs
      hasFetchedTariffs.value.cdek = true
      console.log('Тарифы CDEK:', tariffs)
    } catch (error) {
      console.error('Ошибка при получении тарифов CDEK:', error)
    }
  }

  const fetchBoxberryTariffs = async (products, mailIndex) => {
    if (hasFetchedTariffs.value.boxberry) return
    try {
      const tariffs = await getBoxberryTariff(mailIndex, products)
      boxberryTariffs.value = tariffs
      hasFetchedTariffs.value.boxberry = true
      console.log('Тарифы Boxberry:', tariffs)
    } catch (error) {
      console.error('Ошибка при получении тарифов Boxberry:', error)
    }
  }

  return {
    pochtaTariffs,
    yandexTariffs,
    cdekTariffs,
    boxberryTariffs,
    fetchPochtaTariffs,
    fetchYandexTariffs,
    fetchCdekTariffs,
    fetchBoxberryTariffs
  }
})
