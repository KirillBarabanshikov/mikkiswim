import { useWindowSize } from '@vueuse/core'
import { computed } from 'vue'

export enum DeviceSize {
  DESKTOP = 1760,
  LAPTOP = 1240,
  TABLET = 768,
  MOBILE = 767
}

export const useSizeWindow = () => {
  const { width } = useWindowSize()
  const deviceSize = computed<DeviceSize>(() => {
    if (width.value >= DeviceSize.DESKTOP) return DeviceSize.DESKTOP
    if (width.value >= DeviceSize.LAPTOP) return DeviceSize.LAPTOP
    if (width.value >= DeviceSize.TABLET) return DeviceSize.TABLET
    if (width.value < DeviceSize.MOBILE) return DeviceSize.MOBILE
    else return DeviceSize.MOBILE
  })

  return {
    deviceSize
  }
}
