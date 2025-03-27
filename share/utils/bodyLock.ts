export const useBodyLock = () => {
  const lock = (): void => {
    const body = document.querySelector('body')
    const modals = document.querySelectorAll('.modal')
    const paddingOffset = window.innerWidth - body!.offsetWidth + 'px'
    body!.style.paddingRight = paddingOffset

    // @ts-ignore
    modals?.forEach((item: HTMLElement) => {
      item.style.paddingRight = paddingOffset
    })

    body?.classList.add('lock')
  }
  const unlock = (): void => {
    const body = document.querySelector('body')
    const modals = document.querySelectorAll('.modal')
    body?.classList.remove('lock')
    // @ts-ignore
    modals?.forEach((item: HTMLElement) => {
      item.style.paddingRight = '0px'
    })
    body!.style.paddingRight = '0px'
  }

  return { lock, unlock }
}
