import { ref } from 'vue'

export type ListItem = {
  id: number
  title: string
  chapter: string
  isShow: boolean
}

export const menuItems = ref<ListItem[]>([
  {
    id: 1,
    title: 'Мои покупки',
    chapter: 'purchases',
    isShow: true
  },
  {
    id: 2,
    title: 'Мои возвраты',
    chapter: 'refunds',
    isShow: true
  },
  {
    id: 3,
    title: 'Отзывы',
    chapter: 'reviews',
    isShow: true
  },
  {
    id: 4,
    title: 'Личные данные и адреса',
    chapter: 'info',
    isShow: true
  },
  {
    id: 5,
    title: 'Активация сертификата',
    chapter: 'activeCertificate',
    isShow: true
  },
  {
    id: 6,
    title: 'Сообщения',
    chapter: 'messages',
    isShow: true
  },
  {
    id: 7,
    title: 'Лояльность',
    chapter: 'loyalty',
    isShow: true
  },
  {
    id: 8,
    title: 'Вывод средств',
    chapter: 'withdrawal',
    isShow: true
  },
  {
    id: 9,
    title: 'Условия',
    chapter: 'conditions',
    isShow: true
  }
])
