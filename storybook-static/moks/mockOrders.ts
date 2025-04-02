import type { Order } from '~/entities/order/model/Order'

export const mockOrders: Order[] = [
  {
    id: 1,
    status: 'complete',
    name: 'Владислав',
    surname: 'Слобожанин',
    email: 'admin@admin.ru',
    phone: '+71231234567',
    address: 'string',
    withFitting: true,
    comment: 'string',
    productsCost: 3800,
    deliveryCost: 0,
    deliveryType: '',
    mikkiCoinsUsed: 0,
    mikkiCoinsGain: 190,
    paymentInfo:
      '/home/shared-backend/web/mikkiswim-api.itlabs.top/public_html/src/Controller/Api/Order/OrderController.php - 102 PLACEHOLDER PAYMENT INFO.',
    promoCode: null,
    products: [
      {
        product: {
          id: 3,
          title: 'Купальник1',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      },
      {
        product: {
          id: 4,
          title: 'Купальничек',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      },
      {
        product: {
          id: 4,
          title: 'Купальничек',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      },
      {
        product: {
          id: 4,
          title: 'Купальничек',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      },
      {
        product: {
          id: 4,
          title: 'Купальничек',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      }
    ],
    refunds: [],
    productsData: {
      '3': {
        cost: 3800,
        costWithoutLoyalty: 4000,
        mikkiswim: 190
      },
      total: 3800
    },
    statusText: 'Оплачен, доставлен',
    total: 3800
  },
  {
    id: 2,
    status: 'complete',
    name: 'Владислав',
    surname: 'Слобожанин',
    email: 'admin@admin.ru',
    phone: '+71231234567',
    address: 'string',
    withFitting: true,
    comment: 'string',
    productsCost: 3800,
    deliveryCost: 0,
    deliveryType: '',
    mikkiCoinsUsed: 0,
    mikkiCoinsGain: 190,
    paymentInfo:
      '/home/shared-backend/web/mikkiswim-api.itlabs.top/public_html/src/Controller/Api/Order/OrderController.php - 102 PLACEHOLDER PAYMENT INFO.',
    promoCode: null,
    products: [
      {
        product: {
          id: 3,
          title: 'Купальник1',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      }
    ],
    refunds: [],
    productsData: {
      '3': {
        cost: 3800,
        costWithoutLoyalty: 4000,
        mikkiswim: 190
      },
      total: 3800
    },
    statusText: 'Оплачен, доставлен',
    total: 3800
  },
  {
    id: 3,
    status: 'created',
    name: 'Владислав',
    surname: 'Слобожанин',
    email: 'admin@admin.ru',
    phone: '+71231234567',
    address: 'string',
    withFitting: true,
    comment: 'string',
    productsCost: 3800,
    deliveryCost: 0,
    deliveryType: '',
    mikkiCoinsUsed: 0,
    mikkiCoinsGain: 190,
    paymentInfo:
      '/home/shared-backend/web/mikkiswim-api.itlabs.top/public_html/src/Controller/Api/Order/OrderController.php - 102 PLACEHOLDER PAYMENT INFO.',
    promoCode: null,
    products: [
      {
        product: {
          id: 3,
          title: 'Купальник1',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      }
    ],
    refunds: [],
    productsData: {
      '3': {
        cost: 3800,
        costWithoutLoyalty: 4000,
        mikkiswim: 190
      },
      total: 3800
    },
    statusText: 'Не оплачен, не доставлен',
    total: 3800
  },
  {
    id: 4,
    status: 'created',
    name: 'Владислав',
    surname: 'Слобожанин',
    email: 'admin@admin.ru',
    phone: '+71231234567',
    address: 'string',
    withFitting: true,
    comment: 'string',
    productsCost: 3800,
    deliveryCost: 0,
    deliveryType: '',
    mikkiCoinsUsed: 0,
    mikkiCoinsGain: 190,
    paymentInfo:
      '/home/shared-backend/web/mikkiswim-api.itlabs.top/public_html/src/Controller/Api/Order/OrderController.php - 102 PLACEHOLDER PAYMENT INFO.',
    promoCode: null,
    products: [
      {
        product: {
          id: 3,
          title: 'Купальник1',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      }
    ],
    refunds: [],
    productsData: {
      '3': {
        cost: 3800,
        costWithoutLoyalty: 4000,
        mikkiswim: 190
      },
      total: 3800
    },
    statusText: 'Не оплачен, не доставлен',
    total: 3800
  },
  {
    id: 5,
    status: 'created',
    name: 'Владислав',
    surname: 'Слобожанин',
    email: 'admin@admin.ru',
    phone: '+71231234567',
    address: 'string',
    withFitting: true,
    comment: 'string',
    productsCost: 3800,
    deliveryCost: 0,
    deliveryType: '',
    mikkiCoinsUsed: 0,
    mikkiCoinsGain: 190,
    paymentInfo:
      '/home/shared-backend/web/mikkiswim-api.itlabs.top/public_html/src/Controller/Api/Order/OrderController.php - 102 PLACEHOLDER PAYMENT INFO.',
    promoCode: null,
    products: [
      {
        product: {
          id: 3,
          title: 'Купальник1',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      }
    ],
    refunds: [],
    productsData: {
      '3': {
        cost: 3800,
        costWithoutLoyalty: 4000,
        mikkiswim: 190
      },
      total: 3800
    },
    statusText: 'Не оплачен, не доставлен',
    total: 3800
  },
  {
    id: 6,
    status: 'created',
    name: 'Владислав',
    surname: 'Слобожанин',
    email: 'admin@admin.ru',
    phone: '+71231234567',
    address: 'string',
    withFitting: true,
    comment: 'string',
    productsCost: 3800,
    deliveryCost: 0,
    deliveryType: '',
    mikkiCoinsUsed: 0,
    mikkiCoinsGain: 190,
    paymentInfo:
      '/home/shared-backend/web/mikkiswim-api.itlabs.top/public_html/src/Controller/Api/Order/OrderController.php - 102 PLACEHOLDER PAYMENT INFO.',
    promoCode: null,
    products: [
      {
        product: {
          id: 3,
          title: 'Купальник1',
          price: 4000,
          oldPrice: 5200,
          viewers: 0,
          description:
            'павпавпвапва вап ва пва пвап авпвапвапвап па авпвапва вап вапва вап вап авп авпва пвп вапвапвапва апвапвапвап апвапвап',
          images: [
            {
              id: 1,
              image:
                '/images/product/132197525197834530-4-679b4cb570793782107935.jpg'
            },
            {
              id: 2,
              image:
                '/images/product/132197525197834530-4-679b4cb576c60436675867.jpg'
            },
            {
              id: 3,
              image:
                '/images/product/132197525197834530-4-679b4cb577be9052918839.jpg'
            },
            {
              id: 4,
              image:
                '/images/product/132197525197834530-4-679b4cb5788ec111385301.jpg'
            }
          ],
          tags: [
            { id: 1, title: 'New', color: 'red' },
            { id: 2, title: 'Sale', color: 'blue' }
          ],
          color: 'green',
          reviews: [],
          sizes: [
            { id: 1, title: 'XS', active: true },
            { id: 2, title: 'S', active: true },
            { id: 3, title: 'M', active: true },
            { id: 4, title: 'L', active: false },
            { id: 5, title: 'XL', active: false }
          ],
          marketplaceLinks: [
            {
              id: 1,
              image:
                '/images/marketplace_links/ozon-679b4cb579ba6499087399.png',
              link: 'https://dadlaughbutton.com/'
            }
          ],
          delivery: '<div>ыфвыфвфывфывфывф</div>',
          payments: '<div>фывфывфывфывфывфыв</div>',
          helpSizes: null,
          materials:
            'павп пвапвапвап авпвапвапвап авпвапвапвапвапвап павпавпвапвапвапвап павпвап',
          care: [
            {
              id: 1,
              type: 'first',
              title: 'щхзщхзхзщхзщхзщхз'
            }
          ],
          weight: 123,
          length: 123,
          width: 123,
          height: 123,
          quantity: 8,
          catalogs: [
            {
              id: 4,
              title: 'Раздельные купальники',
              slug: 'razdelnye-kupalniki'
            }
          ],
          combinations: []
        },
        quantity: 1
      }
    ],
    refunds: [],
    productsData: {
      '3': {
        cost: 3800,
        costWithoutLoyalty: 4000,
        mikkiswim: 190
      },
      total: 3800
    },
    statusText: 'Не оплачен, не доставлен',
    total: 3800
  }
]
