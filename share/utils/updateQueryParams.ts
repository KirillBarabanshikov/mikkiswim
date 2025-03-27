type IUpdateQueryParams = (queryParam: string, queryParamValue: string) => void

export const updateQueryParams: IUpdateQueryParams = (
  queryParam,
  queryParamValue
) => {
  const currentUrl = window.location.href
  const url = new URL(currentUrl)

  // Проверяем, нужно ли удалять параметр или обновлять его
  if (
    queryParamValue === '' ||
    queryParamValue === undefined ||
    queryParamValue === 'undefined'
  ) {
    url.searchParams.delete(queryParam)
  } else {
    url.searchParams.set(queryParam, queryParamValue)
  }

  // Обновляем URL без перезагрузки страницы
  window.history.replaceState({}, '', url)
}
