import type { LoyaltyProgram } from '~/entities/loyaltyProgram/model/LoyaltyProgram'

export const mockLoyalty: LoyaltyProgram[] = [
  {
    id: 1,
    title: 'Первый взрослый разряд',
    currency: 0,
    discount: 0.05,
    cumulativeDiscount: 0.05,
    level: 'Бронзовый уровень'
  },
  {
    id: 2,
    title: 'Кандидат в мастера спорта',
    currency: 4150,
    discount: 0.05,
    cumulativeDiscount: 0.1,
    level: 'Серебряный уровень'
  },
  {
    id: 3,
    title: 'Мастер спорта',
    currency: 13150,
    discount: 0.05,
    cumulativeDiscount: 0.15,
    level: 'Золотой уровень'
  },
  {
    id: 4,
    title: 'Мастер спорта международного класса',
    currency: 20150,
    discount: 0.05,
    cumulativeDiscount: 0.2,
    level: 'Платиновый уровень'
  },
  {
    id: 5,
    title: 'Заслуженный мастер спорта',
    currency: 30150,
    discount: 0.05,
    cumulativeDiscount: 0.2,
    level: 'Бриллиантовый уровень'
  }
]
