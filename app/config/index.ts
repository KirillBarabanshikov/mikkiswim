import type { MODE } from './types'
export type { MODE } from './types'

export const scriptConfig = (mode: MODE) => {
  if (mode === 'PROD') {
    return [
      {
        children:
          '(function(a,m,o,ProductRecommend,r,m){a[m]={id:"416934",hash:"cd6b40183e4314da3ccfb8af1ecec763b3682c33191e008828b503e7f0a5a0ef",locale:"ru",inline:true,setMeta:function(p){this.params=(this.params||[]).concat([p])}};a[o]=a[o]||function(){(a[o].q=a[o].q||[]).push(arguments)};var d=a.document,s=d.createElement("script");s.async=true;s.id=m+"_script";s.src="https://gso.amocrm.ru/js/button.js";d.head&&d.head.appendChild(s)}(window,0,"amoSocialButton",0,0,"amo_social_button"))'
      }
    ]
  } else return []
}

export const metaConfig = () => [
  { name: 'yandex-verification', content: 'd9b6cb0a1d4d42c9' },
  {
    name: 'zen-verification',
    content: 'Xu4iw98LvynrHGRkZ265C8qXVYEQO76X52dOoo49xrhmKOJXNtbPS5tywLTybXH6'
  },
  {
    name: 'og:image',
    content: 'https://itlabs.top/img/og.png'
  },
  {
    name: 'og:type',
    content: 'website'
  },
  {
    name: 'og:url',
    content: 'https://itlabs.top'
  },
  {
    name: 'og:title',
    content: 'ITLabs - разработка программного обеспечения'
  },
  {
    name: 'og:description',
    content: 'ITLabs - разработка программного обеспечения'
  },
  {
    httpEquiv: 'Permissions-Policy',
    content: 'geolocation=(self)'
  }
]

export const modulesConfig = (mode: MODE) => {
  const modules: any[] = [
    '@nuxtjs/eslint-module',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    'vue-yandex-maps/nuxt',
    '@vee-validate/nuxt'
  ]
  if (mode === 'PROD') {
    modules.push([
      'yandex-metrika-module-nuxt3',
      {
        id: '97636091',
        webvisor: true,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        ecommerce: 'dataLayer'
      }
    ])
  }
  return modules
}
